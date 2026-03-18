import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie"
function Payment() {

  const {courseid} = useParams()
  const navigate = useNavigate()
  const userid = Cookies.get("id")

  console.log(courseid)

  const openRazorpay = () => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY, // TEST PUBLIC KEY ONLY
      amount: 500 * 100,     // ₹500 in paise
      currency: "INR",
      name: "Demo Project",
      description: "React Only Razorpay Test",

      handler: function (response) {
        // ⚠️ This can be faked — no backend verification
        console.log(response);

        alert(
          "Payment Success (TEST MODE)\n" +
          "Payment ID: " + response.razorpay_payment_id
        );

        let payload = {courseId:courseid,userId:userid,purchased_at:new Date().toString()}
        axios.post("http://localhost:2005/buy",payload).then((res)=>{
          console.log(res.data.data)
          setTimeout(()=>{navigate("/")},2000)
        }).catch((err)=> console.log(err))
      },

      prefill: {
        name: "Test User",
        email: "test@email.com",
        contact: "9999999999"
      },

      theme: {
        color: "#3399cc"
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();

  };

  

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Razorpay Test Mode (React Only)</h2>
      <p>⚠️ No backend | Demo purpose only</p>
      <button onClick={openRazorpay}>Pay ₹500</button>
    </div>
  );
}

export default Payment;
