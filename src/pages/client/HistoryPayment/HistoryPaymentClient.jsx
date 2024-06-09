import {useEffect, useState} from "react";
import axios from "axios";
import {BusinessListHistory} from "../../../components/client/HistoryPayments/BusinessListHistory.jsx";
import {urlGlobal} from "../../../environment/env.js";
export const HistoryPaymentClient = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const storedUser = sessionStorage.getItem('Usuario');
    const [paymentplans, setPaymentPlans] = useState([]);
    const [paymentbags, setPaymentBags] = useState([]);
    const user = storedUser ? JSON.parse(storedUser) : null;
    console.log(user);

    useEffect(() => {
        const fetchPaymentPlans = async () => {
            try {
                const response = await axios.get(urlGlobal + 'paymentplan/historyPaymentPlansClient/' + user.id);
                const paymentPlansData = response.data;
                setPaymentPlans(paymentPlansData);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setPaymentPlans([]); // Si es un 404, simplemente deja el array vacío
                } else {
                    console.error('Error fetching payment plans:', error);
                }
            }
        };

        const fetchPaymentBags = async () => {
            try {
                const response = await axios.get(urlGlobal + 'paymentbag/allbagsperClient/' + user.id);
                const paymentBagsData = response.data;
                setPaymentBags(paymentBagsData);
            } catch (error) {
                if (error.response && error.response.status === 404) {
                    setPaymentBags([]); // Si es un 404, simplemente deja el array vacío
                } else {
                    console.error('Error fetching payment bags:', error);
                }
            }
        };

        fetchPaymentPlans();
        fetchPaymentBags();
    }, [user.id]);

    console.log(paymentplans, paymentbags, "wa");
    return (
        <>
            <div className="main-page-client">
                <div className="container-paymentplans">
                    <BusinessListHistory paymentplans={paymentplans} paymentbags={paymentbags} />
                </div>
            </div>
        </>
    );
};
