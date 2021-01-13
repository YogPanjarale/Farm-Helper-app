import { StyleSheet } from 'react-native';

export const colors = {
    primary: '#5FB955',
    secondary: '#702863',
    bg: '#DDFFE0',
    textprimary: '#365B6D',
    whiteText:'#f0f0f0',
    yellow:'#FFAA00'
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: colors.bg,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        paddingBottom:0,
    },
    settingscontainer: {
        flex: 1,
        backgroundColor: colors.bg,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        width:'100%'
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
        fontWeight: "600",
        fontSize: 30,
        textAlign: 'center',
        color: "#fff",
        //width: 100
        marginBottom: 20
    },
    ModalText: {
        // fontFamily: ' Roboto',
        
        fontStyle: 'normal',
        fontWeight: "600",
        fontSize: 16,
        textAlign: 'center',
        color: colors.textprimary,
        // width:100
    },
    Modal: {
        alignSelf: 'center',
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderRadius: 20,
        padding: 5,
        fontSize:10,
        width:'90%',
    },
    SettingModal: {
        alignSelf: 'flex-start',
        backgroundColor: '#fff',
        borderColor: '#fff',
        borderRadius: 20,
        padding: 5,
        fontSize:10,
        paddingVertical:0,
        width:'90%',
        margin:10
    },
    
    WelcomeModal: {
       alignSelf: 'center',
       width:'100%'
        //backgroundColor: '#fff',
        //borderColor: '#000',
        // borderRadius: 20,
        // padding: 20
       // alignSelf:'stretch'
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
          width: '100%',
        paddingVertical:5,
        borderWidth: 2,
        margin: 5,
        borderColor: colors.yellow,
        borderStyle: "solid",
        // boxSizing: "border-box",
        borderRadius: 5,
        backgroundColor:colors.yellow,
        alignItems: 'center'
    },
    buttonText: {
        // "fontFamily": "Roboto",
        "fontStyle": "normal",
        "fontWeight": "500",
        "fontSize": 20,
        "color": colors.textprimary
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
        color:colors.primaryText,
        fontSize:14
    },
    blackinputContainer:{
        marginTop:5,
        borderColor:colors.primaryText
    },
    blackinputStyle:{
        color:colors.primaryText,
        fontSize:14
    }
})