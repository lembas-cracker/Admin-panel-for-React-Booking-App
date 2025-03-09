import { useEffect } from "react";

/**
 * Hook that notifies about clicks outside of the passed ref.
 */
export function useOutside(ref, onOutside) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (!ref.current?.contains(event.target)) {
                onOutside()
            }
        }

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [ref, onOutside]);
}
