import { FlatList, TouchableOpacity } from "react-native";
import { Product } from "../../types/Product";
import { CartItem } from "../../types/CarItem";
import {
    Item,
    ProductContainer,
    Actions,
    Image,
    QuantityContainer,
    ProductDetails,
    Summary,
    TotalContainer,
} from "./styles";
import { Text } from "../Text";
import { formatCurrency } from "../../utils/formatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import { MinusCircle } from "../Icons/MinusCircle";
import { Button } from "../Button";
import { OrderConfirmedModal } from "../OrderConfirmedModal";
import { useState } from "react";
import { api } from "../../utils/api";

interface CartProps {
    cartItems: CartItem[];
    onAdd: (product: Product) => void;
    onDecrement: (product: Product) => void;
    onConfirmOrder: () => void;
    selectedTable: string;
}

export function Cart({
    cartItems,
    onAdd,
    onDecrement,
    onConfirmOrder,
    selectedTable,
}: CartProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const total = cartItems.reduce((acc, cartItem) => {
        return acc + cartItem.quantity * cartItem.product.price;
    }, 0);

    async function handleConfirmOrder() {
        setIsLoading(true);
        const payload = {
            table: selectedTable,
            products: cartItems.map((cartItem) => ({
                product: cartItem.product._id,
                quantity: cartItem.quantity,
            })),
        };

        await api.post("/orders", payload);

        setIsLoading(false);
        setIsModalVisible(true);
    }

    function handleOk() {
        onConfirmOrder();
        setIsModalVisible(false);
    }

    return (
        <>
            <OrderConfirmedModal visible={isModalVisible} onOk={handleOk} />

            {cartItems.length > 0 && (
                <FlatList
                    data={cartItems}
                    keyExtractor={(cartItem: CartItem) => cartItem.product._id}
                    showsVerticalScrollIndicator={false}
                    style={{ marginBottom: 20, maxHeight: 150 }}
                    renderItem={({ item: cartItem }) => (
                        <Item>
                            <ProductContainer>
                                <Image
                                    source={{
                                        uri: `https://static.itdg.com.br/images/1200-630/c0402ec0fd16e13c7b7b691151d53e1d/277814-original.jpg`,
                                    }}
                                />

                                <QuantityContainer>
                                    <Text size={14} color="#666">
                                        {cartItem.quantity}x
                                    </Text>
                                </QuantityContainer>

                                <ProductDetails>
                                    <Text size={14} weight="600">
                                        {cartItem.product.name}
                                    </Text>
                                    <Text
                                        size={14}
                                        color="#666"
                                        style={{ marginTop: 4 }}
                                    >
                                        {formatCurrency(cartItem.product.price)}
                                    </Text>
                                </ProductDetails>
                            </ProductContainer>

                            <Actions>
                                <TouchableOpacity
                                    style={{ marginRight: 24 }}
                                    onPress={() => onAdd(cartItem.product)}
                                >
                                    <PlusCircle />
                                </TouchableOpacity>

                                <TouchableOpacity
                                    onPress={() =>
                                        onDecrement(cartItem.product)
                                    }
                                >
                                    <MinusCircle />
                                </TouchableOpacity>
                            </Actions>
                        </Item>
                    )}
                />
            )}
            <Summary>
                <TotalContainer>
                    {cartItems.length > 0 ? (
                        <>
                            <Text>Total</Text>
                            <Text size={20} weight="600">
                                {formatCurrency(total)}
                            </Text>
                        </>
                    ) : (
                        <Text color="#999">Seu carrinho está vazio!</Text>
                    )}
                </TotalContainer>
                <Button
                    label="Confirmar pedido"
                    disabled={cartItems.length === 0}
                    onPress={handleConfirmOrder}
                    loading={isLoading}
                />
            </Summary>
        </>
    );
}
