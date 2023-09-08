import { ActivityIndicator } from "react-native";
import { useState } from "react";

import { Button } from "../components/Button";
import { Categories } from "../components/Categories";
import { Header } from "../components/Header";
import { Menu } from "../components/Menu";
import { TableModal } from "../components/TableModal";

import {
    Container,
    CategoriesContainer,
    MenuContainer,
    Footer,
    FooterContainer,
    CenteredContainer,
} from "./styles";

import { Cart } from "../components/Cart";

import { CartItem } from "../types/CarItem";
import { Product } from "../types/Product";

import { products as mockProducts } from "../mocks/products";
import { Empty } from "../components/Icons/Empty";
import { Text } from "../components/Text";

export function Main() {
    const [isTableModalVisible, setIsTableModalVisible] = useState(false);
    const [selectedTable, setSelectedTable] = useState("");
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading] = useState(false);
    const [products] = useState<Product[]>([]);

    function handleSaveTable(table: string) {
        setSelectedTable(table);
    }

    function handleResetOrder() {
        setSelectedTable("");
        setCartItems([]);
    }

    function handleAddToCart(product: Product) {
        if (!selectedTable) setIsTableModalVisible(true);

        setCartItems((prevState) => {
            const itemIndex = prevState.findIndex(
                (cartItem) => cartItem.product._id === product._id
            );

            if (itemIndex < 0) {
                return prevState.concat({
                    quantity: 1,
                    product,
                });
            }

            const newCartItems = [...prevState];

            newCartItems[itemIndex] = {
                ...newCartItems[itemIndex],
                quantity: newCartItems[itemIndex].quantity + 1,
            };

            return newCartItems;
        });
    }

    function handleDecrementCartItem(product: Product) {
        setCartItems((prevState) => {
            const itemIndex = prevState.findIndex(
                (cartItem) => cartItem.product._id === product._id
            );

            const item = prevState[itemIndex];
            const newCartItems = [...prevState];

            if (item.quantity === 1) {
                const newCartItems = [...prevState];
                newCartItems.splice(itemIndex, 1);

                return newCartItems;
            }

            newCartItems[itemIndex] = {
                ...newCartItems[itemIndex],
                quantity: newCartItems[itemIndex].quantity - 1,
            };

            return newCartItems;
        });
    }

    return (
        <>
            <Container>
                <Header
                    onCancelOrder={handleResetOrder}
                    selectedTable={selectedTable}
                />

                {isLoading && (
                    <CenteredContainer>
                        <ActivityIndicator color="#d73045" size="large" />
                    </CenteredContainer>
                )}

                {!isLoading && (
                    <>
                        <CategoriesContainer>
                            <Categories />
                        </CategoriesContainer>

                        {products.length > 0 ? (
                            <>
                                <MenuContainer>
                                    <Menu
                                        products={products}
                                        onAddToCart={handleAddToCart}
                                    />
                                </MenuContainer>
                            </>
                        ) : (
                            <CenteredContainer>
                                <Empty />
                                <Text color="#666" style={{ marginTop: 24 }}>
                                    Nenhum produto foi encontrado!
                                </Text>
                            </CenteredContainer>
                        )}
                    </>
                )}
            </Container>

            <Footer>
                {/* <FooterContainer> */}
                {!selectedTable && (
                    <Button
                        disabled={isLoading}
                        onPress={() => setIsTableModalVisible(true)}
                        label="Novo Pedido"
                    />
                )}

                {selectedTable && (
                    <Cart
                        cartItems={cartItems}
                        onAdd={handleAddToCart}
                        onDecrement={handleDecrementCartItem}
                        onConfirmOrder={handleResetOrder}
                    />
                )}
                {/* </FooterContainer> */}
            </Footer>
            <TableModal
                onClose={() => setIsTableModalVisible(false)}
                visible={isTableModalVisible}
                onSave={handleSaveTable}
            />
        </>
    );
}
