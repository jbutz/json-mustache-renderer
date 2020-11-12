import {
    createEntityAdapter,
    createSlice,
    configureStore,
    createAsyncThunk,
    PayloadAction,
} from '@reduxjs/toolkit'
import { Annotation, AnnotationType } from '../models/Annotation'
import { OReillyLearningService } from '../services/OReillyLearning'

export enum LoadingStatus {
    Idle = 'idle',
    Pending = 'pending'
}

const oreillyLearningService = new OReillyLearningService();

export const fetchAnnotations = createAsyncThunk('annotations/fetchAll', async () => {
    const response = await oreillyLearningService.getAllAnnotations();
    // In this case, `response.data` would be:
    // [{id: 1, first_name: 'Example', last_name: 'User'}]
    return response;
})

const adapter = createEntityAdapter<AnnotationType>({
    selectId: (note) => note.guid,
    // Keep the "all IDs" array sorted based on book titles
    sortComparer: (a, b) => a.documentTitle.localeCompare(b.documentTitle),
})

const annotationsSlice = createSlice({
    name: 'annotations',
    initialState: adapter.getInitialState<{ loading: LoadingStatus; error: string | null; }>({
        loading: LoadingStatus.Idle,
        error: null,
    }),
    reducers: {
        annotationAdded: adapter.addOne,
        annotationsLoading(state, action) {
            if (state.loading === LoadingStatus.Idle) {
                state.loading = LoadingStatus.Pending
            }
        },
        annotationsReceived(state, action) {
            if (state.loading === LoadingStatus.Pending) {
                // Or, call them as "mutating" helpers in a case reducer
                adapter.setAll(state, action.payload)
                state.loading = LoadingStatus.Idle
            }
        },
        annotationUpdated: adapter.updateOne
    },
    extraReducers: builder => {
        builder.addCase(fetchAnnotations.fulfilled, (state, action) => {
            state.loading = LoadingStatus.Idle;
            adapter.upsertMany(state, (action.payload || []).map((x) => x.toJSON()))
        })
        builder.addCase(fetchAnnotations.pending, (state, action) => {
            state.loading = LoadingStatus.Pending;
        })
        builder.addCase(fetchAnnotations.rejected, (state, action) => {
            state.loading = LoadingStatus.Idle;
            state.error = action.payload as string;
        })
    }
});

//export const setAnnotationsLoading = () => store.dispatch(annotationsLoading({}));
//export const setAnnotationsReceived = (annotations: Annotation[]) => store.dispatch(annotationsReceived(annotations.map((x) => x.toJSON())))

const store = configureStore({
    reducer: {
        annotations: annotationsSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>

console.log(store.getState().annotations)
// { ids: [], entities: {} }

// Can create a set of memoized selectors based on the location of this entity state
const annotationsSelectors = adapter.getSelectors<RootState>(
    (state) => state.annotations
);
export const getAllAnnotations = annotationsSelectors.selectAll(store.getState());
export const isAnnotationsLoading = () => store.getState().annotations.loading === LoadingStatus.Pending;


export const {
    selectById: selectAnnotationById,
    selectIds: selectAnnotationIds,
    selectEntities: selectAnnotationEntities,
    selectAll: selectAllAnnotations,
    selectTotal: selectTotalAnnotations
  } = adapter.getSelectors((state: RootState) => state.annotations);