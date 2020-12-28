import { StyleSheet } from 'react-native';

const colors = {
    primary: '#5FB955',
    secondary: '#702863',
    bg: '#DDFFE0',
    textprimary: '#0f0f0f'
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.bg,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    HomeImage: {
        width: 225,
        height: 225,
        resizeMode: 'contain',
       // marginBottom:20,
        position:'relative',
        top:-35,
       // position: 'absolute', top: -4, right: -4,
    },
    HomeHeading: {
        // fontFamily: ' Roboto',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 30,
        textAlign: 'center',
        color: "#fff",
        //width: 100
        marginBottom: 20
    },
    ModalText: {
        // fontFamily: ' Roboto',
        margin: 20,
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: 18,
        textAlign: 'justify',
        color: '#FFf',
        // width:100
    },
    Modal: {
        alignSelf: 'center',
        backgroundColor: '#fffffffa',
        borderColor: '#fff',
        borderRadius: 20,
        padding: 20
    },
    TextInput: {
        width: 200,
        // height:100,
        borderWidth: 2,
        borderColor: "#2F2E41",
        borderStyle: "solid",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 4,
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOpacity: 1
    },
    textInput: {
        height: 40,
        paddingLeft: 6,
        width: 200,
        fontSize: 30
    },
    button: {
        width: 203,
        height: 39,
        borderWidth: 2,
        margin: 5,
        marginTop: 10,
        borderColor: "#FFAA00",
        borderStyle: "solid",
        // boxSizing: "border-box",
        borderRadius: 20,
     
        alignItems: 'center'
    },
    buttonText: {
        "width": 81,
        "height": 39,
        "fontFamily": "Roboto",
        "fontStyle": "normal",
        "fontWeight": "500",
        "fontSize": 20,
        "lineHeight": 23,
        "display": "flex",
        "alignItems": "center",
        "textAlign": "center",
        "color": "#FFAA00"
    }
})