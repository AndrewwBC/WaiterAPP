import { Text } from "../Text";
import { Container } from "./styles";

interface ButtonProps {
    label: "Novo Pedido" | "Salvar" | "Cancelar";
    onPress: () => void;
    disabled?: boolean;
}

export function Button({ label, onPress, disabled }: ButtonProps) {
    return (
        <Container onPress={onPress} disabled={disabled}>
            <Text weight="600" color="#fff">
                {label}
            </Text>
        </Container>
    );
}
