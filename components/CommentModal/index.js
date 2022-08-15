import { useRecoilState } from "recoil";
import { modalAtom } from "@/atom/modal-atom";

const CommentModal = () => {
    const [isOpen, setIsOpen] = useRecoilState(modalAtom);

    return (
        <div>
            <h1>Comment Modal</h1>
            {isOpen && <h2>Modal Is Open</h2>}
        </div>
    );
};

export default CommentModal;
