export type OReillyAnnotation = {
    identifier: string;
    epub_identifier: string;
    epub_title: string;
    cover_url: string;
    chapter_url: string;
    chapter_title: string;
    text: string;
    quote: string;
    fragment: string;
    ranges: {
        start: string;
        startOffset: number;
        end: string;
        endOffset: number;
    }[];
    is_public: false;
    last_modified_time: string;
    user_identifier: string;
    pk: number;
};