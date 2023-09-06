import { Modal } from "react-native";

import { Text } from "../Text";
import { Product } from "../../types/Product";
import { Image } from "./styles";

interface ProductModalProps {
    visible: boolean;
    onClose: () => void;
    product: null | Product;
}

export function ProductModal({ visible, onClose, product }: ProductModalProps) {
    return (
        <Modal
            visible={visible}
            animationType="slide"
            presentationStyle="pageSheet"
            onRequestClose={onClose}
        >
            <Image
                source={{
                    uri: `https://static.itdg.com.br/images/1200-630/c0402ec0fd16e13c7b7b691151d53e1d/277814-original.jpg`,
                }}
            ></Image>
            <Text>ProductModal</Text>
        </Modal>
    );
}
