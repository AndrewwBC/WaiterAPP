import { ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";

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

import { Empty } from "../components/Icons/Empty";
import { Text } from "../components/Text";
import { Category } from "../types/Category";
import { api } from "../utils/api";

export function Main() {
    const [isTableModalVisible, setIsTableModalVisible] = useState(false);
    const [selectedTable, setSelectedTable] = useState("");
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoadingProducts, setIsLoadingProducts] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        Promise.all([api.get("/categories"), api.get("/products")])
            .then(([categoriesResponse, productsResponse]) => {
                console.log(JSON.stringify(productsResponse.data, null, 2));
                setCategories(categoriesResponse.data);
                setProducts(productsResponse.data);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    async function handleSelectCategory(categoryId: string) {
        const route = !categoryId
            ? "/products"
            : `/categories/${categoryId}/products`;

        setIsLoadingProducts(true);
        const { data } = await api.get(route);

        setProducts(data);
        setIsLoadingProducts(false);
    }

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
                            <Categories
                                onSelectCategory={handleSelectCategory}
                                categories={categories}
                            />
                        </CategoriesContainer>

                        {isLoadingProducts ? (
                            <CenteredContainer>
                                <ActivityIndicator
                                    color="#d73045"
                                    size="large"
                                />
                            </CenteredContainer>
                        ) : (
                            <>
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
                                        <Text
                                            color="#666"
                                            style={{ marginTop: 24 }}
                                        >
                                            Nenhum produto foi encontrado!
                                        </Text>
                                    </CenteredContainer>
                                )}
                            </>
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
                        selectedTable={selectedTable}
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
