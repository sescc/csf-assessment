export interface Picture {
    id: string
    date: Date
    title: string
    comments: string
    url: string
    size: number
}

export interface UploadResult {
    imageKey: string
}