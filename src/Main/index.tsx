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
} from "./styles";

export function Main() {
    const [isTableModalVisible, setIsTableModalVisible] = useState(false);
    const [selectedTable, setSelectedTable] = useState("");

    function handleSaveTable(table: string) {
        setSelectedTable(table);
    }

    function handleCancelOrder() {
        setSelectedTable("");
    }

    return (
        <>
            <Container>
                <Header
                    onCancelOrder={handleCancelOrder}
                    selectedTable={selectedTable}
                />

                <CategoriesContainer>
                    <Categories />
                </CategoriesContainer>

                <MenuContainer>
                    <Menu />
                </MenuContainer>
            </Container>

            <Footer>
                {!selectedTable && (
                    <FooterContainer>
                        <Button
                            onPress={() => setIsTableModalVisible(true)}
                            label="Novo Pedido"
                        />
                    </FooterContainer>
                )}
            </Footer>
            <TableModal
                onClose={() => setIsTableModalVisible(false)}
                visible={isTableModalVisible}
                onSave={handleSaveTable}
            />
        </>
    );
}