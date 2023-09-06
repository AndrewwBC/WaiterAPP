import styled from "styled-components/native";
import { Platform, StatusBar } from "react-native";

const isAndroid = Platform.OS === "android";

export const Container = styled.SafeAreaView`
    flex: 1;
    background: #fafafa;
    margin-top: ${isAndroid ? StatusBar.currentHeight : 0}px;
`;

export const CategoriesContainer = styled.View`
    height: 73px;
    margin-top: 32px;
`;

export const MenuContainer = styled.View`
    flex-grow: 1;
`;

export const Footer = styled.View`
    min-height: 110px;
    background: #fff;
    padding: 16px 24px;
`;

export const FooterContainer = styled.SafeAreaView``;
