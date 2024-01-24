import SpeedDialComponent from "./SpeedDialComponent"

export default {
    component: SpeedDialComponent,
    title: 'Speed Dial',
    tags: ['graph', 'control']
}

export const Default = {
    args: {
        graph: {
            nodes: ['a', 'b'],
            links: [['b'], ['a']]
        }
    }
}