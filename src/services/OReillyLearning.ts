import 'whatwg-fetch';
import { Annotation } from '../models/Annotation';
import { OReillyAnnotation } from '../models/OReillyAnnotation';
import { OReillyResponse } from '../models/OReillyResponse';
import {setAnnotationsLoading, setAnnotationsReceived} from '../store'

type Response = {
    status: number;
    ok: boolean;
    body: unknown;
}

export class OReillyLearningService {
    public async getAllAnnotations() {
        setAnnotationsLoading();
        const annotations: OReillyAnnotation[] = [];
        let resp: Response | null = await this.httpGet('https://learning.oreilly.com/api/v1/annotations/all/?page_size=1000');
        while(resp) {
            if(!resp.ok) {
                throw new Error('Error occurred while loading O\'Reilly Annotiations');
            }
            if(resp.body && typeof resp.body === 'object' && resp.body.hasOwnProperty('count') && resp.body.hasOwnProperty('results')) {
                const annotationResp = resp.body as OReillyResponse;
                annotations.push(...annotationResp.results);

                if(annotationResp.next) {
                    resp = await this.httpGet(annotationResp.next);
                } else {
                    resp = null;
                }
            } else {
                throw new Error('Unexpected response from O\'Reilly');
            }
        }

        setAnnotationsReceived(annotations.map(Annotation.fromOReillyAnnotation));
    }

    private async httpGet(url: string): Promise<Response> {
        const resp = await fetch(url, {
            credentials: "include",
            mode: "cors",
            method: "GET"
        });

        return {
            status: resp.status,
            ok: resp.ok,
            body: (await resp.json()) as unknown
        };
    }
}