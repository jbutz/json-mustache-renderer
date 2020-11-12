import { OReillyAnnotation } from "./OReillyAnnotation";

export type OReillyResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: OReillyAnnotation[];
}