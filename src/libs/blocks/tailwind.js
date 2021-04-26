import sources from '../../data'

const loadTailwindBlocks = (newEditor) => {
    const blockManager = newEditor.BlockManager

    sources.forEach((s) => {
        blockManager.add(s.id, {
            label: s.label,
            attributes: { class: s.class },
            content: s.content,
            category: { label: s.category, order: s.order, open: true },
        })
    })
}
export { loadTailwindBlocks }