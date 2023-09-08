import { FlatList, Modal } from "react-native";

import { Text } from "../Text";
import { Product } from "../../types/Product";
import {
    CloseButton,
    Footer,
    FooterContainer,
    Header,
    Image,
    Ingredient,
    IngredientsContainer,
    ModalBody,
    PriceContainer,
} from "./styles";
import { Close } from "../Icons/Close";
import { formatCurrency } from "../../utils/formatCurrency";
import { Button } from "../Button";

interface ProductModalProps {
    visible: boolean;
    onClose: () => void;
    product: null | Product;
    onAddToCart: (product: Product) => void;
}

export function ProductModal({
    visible,
    onClose,
    product,
    onAddToCart,
}: ProductModalProps) {
    if (!product) {
        return null;
    }

    function handleAddToCart() {
        onAddToCart(product!);
        onClose();
    }

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
            >
                <CloseButton onPress={onClose}>
                    <Close />
                </CloseButton>
            </Image>

            <ModalBody>
                <Header>
                    <Text size={24} weight="600">
                        {product.name}
                    </Text>
                    <Text color="#666" style={{ marginTop: 8 }}>
                        {product.description}
                    </Text>
                </Header>

                {product.ingredients.length > 0 && (
                    <IngredientsContainer>
                        <Text weight="600" color="#666">
                            Ingredientes
                        </Text>

                        <FlatList
                            data={product.ingredients}
                            keyExtractor={(ingredient) => ingredient._id}
                            showsVerticalScrollIndicator={false}
                            style={{ marginTop: 16 }}
                            renderItem={({ item: ingredient }) => (
                                <Ingredient>
                                    <Text>{ingredient.icon}</Text>
                                    <Text size={14} color="#666">
                                        {ingredient.name}
                                    </Text>
                                </Ingredient>
                            )}
                        />
                    </IngredientsContainer>
                )}
            </ModalBody>

            <Footer>
                <FooterContainer>
                    <PriceContainer>
                        <Text color="#666">Preço</Text>
                        <Text size={20} weight="600">
                            {formatCurrency(product.price)}
                        </Text>
                    </PriceContainer>
                    <Button
                        label="Adicionar ao pedido."
                        onPress={handleAddToCart}
                    />
                </FooterContainer>
            </Footer>
        </Modal>
    );
}
