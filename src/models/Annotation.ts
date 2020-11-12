import { OReillyAnnotation } from "./OReillyAnnotation";

export type AnnotationType = {
    guid: string;
    documentTitle: string;
    documentCoverUrl: string;
    documentChapterUrl: string;
    documentChapterTitle: string;
    annotationHtml: string;
    annotationText: string;
};

export class Annotation implements AnnotationType {
    public readonly guid: string;
    public readonly documentTitle: string;
    public readonly documentCoverUrl: string;
    public readonly documentChapterUrl: string;
    public readonly documentChapterTitle: string;
    public readonly annotationHtml: string;
    public readonly annotationText: string;

    constructor(annotation: AnnotationType) {
        this.guid = annotation.guid;
        this.documentTitle = annotation.documentTitle;
        this.documentCoverUrl = annotation.documentCoverUrl;
        this.documentChapterUrl = annotation.documentChapterUrl;
        this.documentChapterTitle = annotation.documentChapterTitle;
        this.annotationHtml = annotation.annotationHtml;
        this.annotationText = annotation.annotationText;
    }

    static fromOReillyAnnotation(input: OReillyAnnotation) {
        return new Annotation({
            guid: input.identifier,
            documentTitle: input.epub_title,
            documentChapterTitle: input.chapter_title,
            documentCoverUrl: input.cover_url,
            documentChapterUrl: input.chapter_url,
            annotationHtml: input.fragment,
            annotationText: input.quote,
        });
    }

    toJSON(): AnnotationType {
        return {
            guid: this.guid,
            documentTitle: this.documentTitle,
            documentCoverUrl: this.documentCoverUrl,
            documentChapterUrl: this.documentChapterUrl,
            documentChapterTitle: this.documentChapterTitle,
            annotationHtml: this.annotationHtml,
            annotationText: this.annotationText,
        };
    }
}