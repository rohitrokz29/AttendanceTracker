import React, { useEffect, useState } from 'react'
import { generateMatrix } from './MonthMatrix';
import { Pressable, View, Text, Button, StyleSheet, Modal } from 'react-native';
import { months } from './MonthMatrix';
import UpdateAttendance from './UpdateAttendance';
const Calendar = ({ subjectData }) => {

    const [activeDate, setActiveDate] = useState(new Date(subjectData['startDate']));
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        if (activeDate != subjectData['currentLastDate']) {
            setActiveDate(new Date(subjectData['currentLastDate']));
        }
    }, []);

    var matrix = generateMatrix(activeDate);

    const setAttendance = (item) => {
        if (typeof item !== 'string' && item !== -1) {
            const newDate = new Date(activeDate.setDate(item));
            setActiveDate(newDate);
            setModalVisible(modalVisible => !modalVisible);
        }
    };


    var rows = matrix.map((row, rowIndex) => {
        var rowItems = row.map((item, colIndex) => {
            let color = "#fff";
            if (item !== -1) {
                let currDate = new Date();
                currDate.setDate(item);
                currDate.setMonth(activeDate.getMonth());
                currDate.setFullYear(activeDate.getFullYear());
                currDate = new Date(currDate).toDateString();
                if(subjectData['1'].includes(currDate)){
                    color='green';
                }
                else if(subjectData['0'].includes(currDate)){
                    color='red';
                }
                else if(subjectData['-1'].includes(currDate)) {
                    color='#ff9595'
                }
                else{
                    color="#000"
                }
            }


            return (
                <Pressable
                    key={`${item}${colIndex}${rowIndex}${row}`}
                    onPress={() => setAttendance(item)}
                    style={[
                        styles.date,
                        item == activeDate.getDate()
                            ? styles.activeDate
                            : styles.inActiveDate,
                    ]}>
                    <Text
                        style={{
                            textAlign: 'center',
                            color,
                            fontWeight: item == activeDate.getDate() ? 'bold' : 'normal',
                            fontSize: 14
                        }}>
                        {item != -1 ? item : ''}
                    </Text>
                </Pressable>
            );
        });

        return <View style={styles.rowContainer}>{rowItems}</View>;
    });


    const changeMonth = (n) => {
        const newDate = new Date(activeDate.setMonth(activeDate.getMonth() + n));
        setActiveDate(newDate);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.currentDate}>
                {`${months[activeDate.getMonth()]} ${activeDate.getFullYear()}`}
            </Text>
            <View>{rows}</View>
            <View key={'buttons'} style={styles.actionContainer}>
                <View key={"prev"} style={{ flex: 1, marginHorizontal: 2 }}>
                    <Button
                        title="Previous"
                        color={"#000"}
                        onPress={() => changeMonth(-1)}
                    />
                </View>
                <View key={"next"} style={{ flex: 1, marginHorizontal: 2 }}>
                    <Button
                        title="Next"
                        color={"#000"}
                        onPress={() => changeMonth(+1)}
                    />
                </View>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <UpdateAttendance subject={subjectData['subject']} date={activeDate} setModalVisible={setModalVisible} />
            </Modal>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 12
    },
    rowContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    date: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    activeDate: {
        backgroundColor: "#ddd",
        borderRadius: 20
    },
    inActiveDate: {
        backgroundColor: '#fff'
    },
    actionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flex: 1,
        marginVertical:20
    },
    currentDate: {
        fontWeight: '600',
        fontSize: 28,
        textAlign: 'center',
        paddingVertical: 15

    },
});

export default Calendar