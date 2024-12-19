import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useRoute, useNavigation } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { COLORS, PADDING, PADDING_SM } from "../utils/constants";
import Footer from "../components/Footer";
import { SafeAreaView } from "react-native-safe-area-context";
import CheckRow from "../components/CheckRow";

const BookingForm = () => {
  const route = useRoute();
  const { hotel } = route.params;

  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    email: "",
    phone: "",
    checkIn: new Date(),
    checkOut: new Date(new Date().setDate(new Date().getDate() + 3)),
    roomType: "Deluxe",
    numberOfRooms: 1,
    numberOfGuests: 1,
  });

  const [showCheckInPicker, setShowCheckInPicker] = useState(false);
  const [showCheckOutPicker, setShowCheckOutPicker] = useState(false);

  const calculateTotal = () => {
    const nights = Math.ceil(
      (formData.checkOut - formData.checkIn) / (1000 * 60 * 60 * 24)
    );
    return hotel.price * formData.numberOfRooms * nights;
  };

  const formatDate = date => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${months[date.getMonth()]} ${date.getDate()}`;
  };

  const handleDateChange = (event, selectedDate, type) => {
    if (Platform.OS === "android") {
      setShowCheckInPicker(false);
      setShowCheckOutPicker(false);
    }

    if (selectedDate) {
      setFormData(prev => ({
        ...prev,
        [type]: selectedDate,
      }));
    }
  };

  const handleContinue = () => {
    console.log("Form Data:", formData);
  };

  return (
    <SafeAreaView style={styles.container} edges={["bottom", "top"]}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Form Fields */}
        <View style={styles.form}>
          <View style={styles.upContainer}>
            {/* Name Fields */}
            <View style={styles.rowContainer}>
              <View style={styles.halfInput}>
                <Text style={styles.label}>First Name</Text>
                <TextInput
                  style={styles.input}
                  value={formData.firstName}
                  onChangeText={text =>
                    setFormData(prev => ({ ...prev, firstName: text }))
                  }
                  placeholder="First name"
                />
              </View>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Surname</Text>
                <TextInput
                  style={styles.input}
                  value={formData.surname}
                  onChangeText={text =>
                    setFormData(prev => ({ ...prev, surname: text }))
                  }
                  placeholder="Surname"
                />
              </View>
            </View>

            {/* Email Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={formData.email}
                onChangeText={text =>
                  setFormData(prev => ({ ...prev, email: text }))
                }
                placeholder="Email"
                keyboardType="email-address"
              />
            </View>

            {/* Phone Field */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone</Text>
              <TextInput
                style={styles.input}
                value={formData.phone}
                onChangeText={text =>
                  setFormData(prev => ({ ...prev, phone: text }))
                }
                placeholder="Phone number"
                keyboardType="phone-pad"
              />
            </View>
          </View>
          <View style={styles.downContainer}>
            {/* Check-in/Check-out Dates */}
            <CheckRow
              touchable={true}
              textCheckIn={formatDate(formData.checkIn)}
              textCheckOut={formatDate(formData.checkOut)}
              onPressCheckIn={() => setShowCheckInPicker(true)}
              onPressCheckOut={() => setShowCheckOutPicker(true)}
            />

            {/* Room Type Selector */}
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Room Type</Text>
              <TouchableOpacity style={styles.selector}>
                <Text>{formData.roomType}</Text>
                <MaterialIcons
                  name="keyboard-arrow-down"
                  size={24}
                  color={COLORS.grayFont}
                />
              </TouchableOpacity>
            </View>

            {/* Number of Rooms */}
            <View style={styles.rowContainer}>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Number of rooms</Text>
                <View style={styles.counterContainer}>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() =>
                      setFormData(prev => ({
                        ...prev,
                        numberOfRooms: Math.max(1, prev.numberOfRooms - 1),
                      }))
                    }
                  >
                    <Text style={styles.counterButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterText}>
                    {formData.numberOfRooms}
                  </Text>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() =>
                      setFormData(prev => ({
                        ...prev,
                        numberOfRooms: prev.numberOfRooms + 1,
                      }))
                    }
                  >
                    <Text style={styles.counterButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style={styles.halfInput}>
                <Text style={styles.label}>Guest</Text>
                <View style={styles.counterContainer}>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() =>
                      setFormData(prev => ({
                        ...prev,
                        numberOfGuests: Math.max(1, prev.numberOfGuests - 1),
                      }))
                    }
                  >
                    <Text style={styles.counterButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.counterText}>
                    {formData.numberOfGuests}
                  </Text>
                  <TouchableOpacity
                    style={styles.counterButton}
                    onPress={() =>
                      setFormData(prev => ({
                        ...prev,
                        numberOfGuests: prev.numberOfGuests + 1,
                      }))
                    }
                  >
                    <Text style={styles.counterButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          {/* Date Pickers */}
          {showCheckInPicker && (
            <DateTimePicker
              value={formData.checkIn}
              mode="date"
              display="default"
              minimumDate={new Date()}
              onChange={(event, date) =>
                handleDateChange(event, date, "checkIn")
              }
            />
          )}
          {showCheckOutPicker && (
            <DateTimePicker
              value={formData.checkOut}
              mode="date"
              display="default"
              minimumDate={new Date(formData.checkIn.getTime() + 86400000)}
              onChange={(event, date) =>
                handleDateChange(event, date, "checkOut")
              }
            />
          )}
        </View>
      </ScrollView>

      <Footer
        title="Continue"
        hotel={hotel}
        formData={formData}
        price={calculateTotal().toLocaleString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: PADDING_SM,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContentContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  form: {
    flex: 1,
    justifyContent: "space-between",
  },
  upContainer: {
    flex: 0,
  },
  downContainer: {
    flex: 0,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: PADDING,
  },
  halfInput: {
    width: "46%",
  },
  inputContainer: {
    marginBottom: PADDING,
  },
  label: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.inActiveLine,
    borderRadius: 10,
    padding: 12,
    backgroundColor: COLORS.inActiveBackground,
  },
  dateButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.inActiveLine,
    borderRadius: 10,
    padding: 12,
    backgroundColor: COLORS.inActiveBackground,
  },
  selector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: COLORS.inActiveLine,
    borderRadius: 10,
    padding: 12,
    backgroundColor: COLORS.inActiveBackground,
  },
  counterContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: COLORS.inActiveLine,
    borderRadius: 10,
    padding: 8,
    backgroundColor: COLORS.inActiveBackground,
  },
  counterButton: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: COLORS.primaryLight,
    justifyContent: "center",
    alignItems: "center",
  },
  counterButtonText: {
    fontSize: 18,
    color: COLORS.primary,
    fontWeight: "bold",
  },
  counterText: {
    fontSize: 14,
    fontFamily: "Poppins-SemiBold",
  },
});

export default BookingForm;