export default function ModalButton({ children, buttonid, buttonType }) {
    return <button type="button" class={`btn btn-outline-${buttonType}`} data-bs-toggle="modal" data-bs-target={`#${buttonid}`}>
        {children}
    </button>
}