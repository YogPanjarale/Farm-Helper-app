import { StyleSheet } from 'react-native';

export const colors = {
    primary: '#5FB955',
    secondary: '#702863',
    bg: '#DDFFE0',
    textprimary: '#0f0f0f',
    whiteText:'#f0f0f0'
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
        backgroundColor: '#fff9',
        borderColor: '#fff',
        borderRadius: 20,
        padding: 20
    },
    WelcomeModal: {
        alignSelf: 'center',
        backgroundColor: '#5ABF5666',
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
        borderColor: "#FFcA00",
        borderStyle: "solid",
        // boxSizing: "border-box",
        borderRadius: 20,
        backgroundColor:'#ffffff0f',
        alignItems: 'center'
    },
    buttonText: {
        "width": 81,
        "height": 39,
        // "fontFamily": "Roboto",
        "fontStyle": "normal",
        "fontWeight": "500",
        "fontSize": 20,
        "lineHeight": 23,
        "alignItems": "center",
        "textAlign": "center",
        "color": "#FFAA00"
    },
    inputLabel:{
        color:colors.whiteText
    },
    inputContainer:{
        borderColor:colors.whiteText
    },
    inputStyle:{
        color:colors.whiteText
    },
    blackinputLabel:{
        color:colors.primaryText
    },
    blackinputContainer:{
        borderColor:colors.primaryText
    },
    blackinputStyle:{
        color:colors.primaryText
    }
})