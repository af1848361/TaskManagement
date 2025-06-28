import { StyleSheet } from "react-native";
import { responsiveWidth, sizes } from "../../services";

export const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        //alignItems: 'center',
        //padding: 20,
    },
    label: {
        marginBottom: 10,
        fontSize: 16,
    },
    dropdown: {
        height: sizes.inputHeight,
        width: responsiveWidth(90),
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
    },
});