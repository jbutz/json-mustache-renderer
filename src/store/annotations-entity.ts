import {
    createEntityAdapter,
    createSlice,
    configureStore,
} from '@reduxjs/toolkit'
import { Annotation, AnnotationType } from '../models/Annotation'

enum LoadingStatus {
    Idle = 'idle',
    Pending = 'pending'
}

const adapter = createEntityAdapter<AnnotationType>({
    selectId: (note) => note.guid,
    // Keep the "all IDs" array sorted based on book titles
    sortComparer: (a, b) => a.documentTitle.localeCompare(b.documentTitle),
})

const annotationsSlice = createSlice({
    name: 'annotations',
    initialState: adapter.getInitialState({
        loading: LoadingStatus.Idle
    }),
    reducers: {
        // Can pass adapter functions directly as case reducers.  Because we're passing this
        // as a value, `createSlice` will auto-generate the `annotationAdded` action type / creator
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
});

const {
    annotationAdded,
    annotationUpdated,
    annotationsLoading,
    annotationsReceived,
} = annotationsSlice.actions;

export const setAnnotationsLoading = () => store.dispatch(annotationsLoading({}));
export const setAnnotationsReceived = (annotations: Annotation[]) => store.dispatch(annotationsReceived(annotations.map((x) => x.toJSON())))

const store = configureStore({
    reducer: {
        annotations: annotationsSlice.reducer,
    },
})

type RootState = ReturnType<typeof store.getState>

console.log(store.getState().annotations)
// { ids: [], entities: {} }

// Can create a set of memoized selectors based on the location of this entity state
const annotationsSelectors = adapter.getSelectors<RootState>(
    (state) => state.annotations
);
export const getAllAnnotations = annotationsSelectors.selectAll(store.getState());
export const isAnnotationsLoading = () => store.getState().annotations.loading === LoadingStatus.Pending;