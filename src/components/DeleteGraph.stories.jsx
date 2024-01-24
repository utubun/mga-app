import DeleteGraph from "./DeleteGraph"

export default {
    component: DeleteGraph,
    title: 'Graph/button/delete',
    tags: ['graph', 'delete']
}

export const Default = {
    args: {
        graph: {
            nodes: ['a', 'b'],
            links: [['b'], ['a']]
        }
    }
}