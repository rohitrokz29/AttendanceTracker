import React from 'react'
import { View, Text, StyleSheet, Pressable, Image, ImageBackground } from 'react-native'
const Home = ({ navigation }) => {

    const styles = StyleSheet.create({
        firstHalf: {
            flex: 1,
            maxHeight: "60%",
            minHeight: "50%",
            alignItems: 'center',
            justifyContent: 'center',
        },
        welcomeText: {
            fontSize: 40,
            fontWeight: "bold",
            fontFamily: "Georgia, 'Times New Roman', Times, serif",
            color: '#fff266',
            borderBottomWidth: 4,
            borderBottomColor: "#ff6666",
            paddingVertical: 2,

        },
        welcomeText2: {
            fontSize: 20,
            color: '#b4feff',
            textAlign: 'center',
            marginTop: "10%",
            paddingHorizontal: "15%",
            fontFamily: "Georgia, Times, serif"
        },
        bottomHalf: {
            justifyContent: 'flex-start',
            alignItems: 'center'
        },
        button: {

            alignItems: 'center',
            paddingVertical: 10,
            paddingHorizontal: 75,
            borderRadius: 10,
            elevation: 3,
            backgroundColor: 'yellowgreen',
            borderWidth: 2,
            borderColor: "cyan"
        },
        buttonText: {
            fontSize: 20,
            fontWeight: "bold",
            fontFamily: 'Times New Roman',
            color: "#4e0707",
        },
        imgBack: {
            flex: 1,
            resizeMode: "center",
        },
        wholeView: {
            width: "100%",
            flex: 1,
            backgroundColor: "#00000070"
        }

    });

    return (<>
        <ImageBackground style={styles.imgBack} source={require('../images/stud.webp')}>
            <View style={styles.wholeView}>
                <View style={styles.firstHalf}>
                    <Text style={styles.welcomeText}> Welcome </Text>
                    <Text style={styles.welcomeText2}>Have a Recorded Attendance for Proper Time Management</Text>
                </View>
                <View style={styles.bottomHalf}>
                    <Pressable
                        style={styles.button}
                        onPress={() => navigation.navigate('createUser')}
                    >
                        <Text style={styles.buttonText}>Get Started</Text>
                    </Pressable>
                </View>

            </View>
        </ImageBackground>
    </>
    )

}


export default Home