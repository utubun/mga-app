import FileUpload from "./UploadDialogue";

export default {
    component: FileUpload,
    title: 'Graph/button/upload',
    tags: ['graph', 'post']
}

export const Default = {
    args: {
        graph: {
            nodes: ['a', 'b'],
            links: [['b'], ['a']]
        }
    }
}