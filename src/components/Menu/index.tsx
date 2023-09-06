import { FlatList, TouchableOpacity } from "react-native";
import { useState } from "react";

import { products } from "../../mocks/products";
import { Text } from "../Text";

import {
    Product,
    ProductImage,
    ProductDetails,
    Separator,
    AddToCartButton,
} from "./styles";

import { formatCurrency } from "../../utils/formatCurrency";
import { PlusCircle } from "../Icons/PlusCircle";
import { ProductModal } from "../ProductModal";
import { Product as ProductType } from "../../types/Product";

export function Menu() {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<null | ProductType>(
        null
    );

    function handleOpenModal(product: ProductType) {
        setIsModalVisible(true);
        setSelectedProduct(product);
    }

    return (
        <>
            <ProductModal
                visible={true}
                onClose={() => setIsModalVisible(false)}
                product={selectedProduct}
            />

            <FlatList
                data={products}
                ItemSeparatorComponent={Separator}
                style={{ marginTop: 32 }}
                contentContainerStyle={{ paddingHorizontal: 24 }}
                keyExtractor={(product) => product._id}
                renderItem={({ item: product }) => (
                    <Product onPress={() => handleOpenModal(product)}>
                        <ProductImage
                            source={{
                                uri: `https://img.freepik.com/premium-photo/whole-italian-pizza-wooden-table-with-ingredients_251318-13.jpg`,
                            }}
                        />

                        <ProductDetails>
                            <Text weight="600">{product.name}</Text>
                            <Text
                                size={14}
                                color="#666"
                                style={{ marginVertical: 8 }}
                            >
                                {product.description}
                            </Text>
                            <Text weight="600">
                                {" "}
                                {formatCurrency(product.price)}
                            </Text>
                        </ProductDetails>

                        <AddToCartButton>
                            <PlusCircle />
                        </AddToCartButton>
                    </Product>
                )}
            />
        </>
    );
}
