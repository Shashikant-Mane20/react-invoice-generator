// import React, { useState } from "react";
// import { PDFDownloadLink, Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";

// const InvoiceGenerator = () => {
//   const [logo, setLogo] = useState(null);
//   const [invoiceNumber, setInvoiceNumber] = useState("");
//   const [invoiceDate, setInvoiceDate] = useState("");
//   const [dueDate, setDueDate] = useState("");
//   const [billTo, setBillTo] = useState("");
//   const [address, setAddress] = useState("");
//   const [items, setItems] = useState([{ service: "", description: "", quantity: 1, price: 0 }]);

//   const handleLogoUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setLogo(reader.result); // Save base64 string as logo
//       };
//       reader.readAsDataURL(file); // Read file as base64
//     }
//   };

//   const handleItemChange = (index, field, value) => {
//     const updatedItems = items.map((item, i) => (i === index ? { ...item, [field]: value } : item));
//     setItems(updatedItems);
//   };

//   const addItem = () => {
//     setItems([...items, { service: "", description: "", quantity: 1, price: 0 }]);
//   };

//   const subtotal = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
//   const tax = subtotal * 0.1;
//   const total = subtotal + tax;

//   return (
//     <div className="bg-gray-100 min-h-screen p-6">
//       <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow-lg">
//         {/* Logo Upload and Preview */}
//         <div className="mb-6 text-center">
//           <label className="block text-gray-700 text-sm font-medium mb-2">Upload Logo</label>
//           <input type="file" onChange={handleLogoUpload} className="block mx-auto mb-4" />
//           {logo && <img src={logo} alt="Logo" className="mx-auto w-32 h-32 object-contain" />}
//         </div>

//         {/* Invoice Form */}
//         <div className="mb-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//             {/* Invoice Details */}
//             <div>
//               <label className="block text-gray-700">Invoice Number</label>
//               <input
//                 type="text"
//                 value={invoiceNumber}
//                 onChange={(e) => setInvoiceNumber(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700">Invoice Date</label>
//               <input
//                 type="date"
//                 value={invoiceDate}
//                 onChange={(e) => setInvoiceDate(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700">Due Date</label>
//               <input
//                 type="date"
//                 value={dueDate}
//                 onChange={(e) => setDueDate(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded"
//               />
//             </div>
//           </div>

//           {/* Billing Details */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//             <div>
//               <label className="block text-gray-700">Bill To</label>
//               <input
//                 type="text"
//                 value={billTo}
//                 onChange={(e) => setBillTo(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded"
//               />
//             </div>
//             <div>
//               <label className="block text-gray-700">Address</label>
//               <textarea
//                 value={address}
//                 onChange={(e) => setAddress(e.target.value)}
//                 className="w-full p-3 border border-gray-300 rounded"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Items Table */}
//         <table className="w-full table-auto border-collapse mb-6">
//           <thead>
//             <tr>
//               <th className="border-b py-3 px-4">Service</th>
//               <th className="border-b py-3 px-4">Description</th>
//               <th className="border-b py-3 px-4">Quantity</th>
//               <th className="border-b py-3 px-4">Price</th>
//               <th className="border-b py-3 px-4">Total</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.map((item, index) => (
//               <tr key={index}>
//                 <td className="border-b py-3 px-4">
//                   <input
//                     type="text"
//                     value={item.service}
//                     onChange={(e) => handleItemChange(index, "service", e.target.value)}
//                     className="w-full p-3 border border-gray-300 rounded"
//                   />
//                 </td>
//                 <td className="border-b py-3 px-4">
//                   <input
//                     type="text"
//                     value={item.description}
//                     onChange={(e) => handleItemChange(index, "description", e.target.value)}
//                     className="w-full p-3 border border-gray-300 rounded"
//                   />
//                 </td>
//                 <td className="border-b py-3 px-4">
//                   <input
//                     type="number"
//                     min="1"
//                     value={item.quantity}
//                     onChange={(e) => handleItemChange(index, "quantity", parseFloat(e.target.value))}
//                     className="w-full p-3 border border-gray-300 rounded"
//                   />
//                 </td>
//                 <td className="border-b py-3 px-4">
//                   <input
//                     type="number"
//                     min="0"
//                     value={item.price}
//                     onChange={(e) => handleItemChange(index, "price", parseFloat(e.target.value))}
//                     className="w-full p-3 border border-gray-300 rounded"
//                   />
//                 </td>
//                 <td className="border-b py-3 px-4">${(item.quantity * item.price).toFixed(2)}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//         <button
//           onClick={addItem}
//           className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
//         >
//           Add Item
//         </button>

//         {/* Totals */}
//         <div className="text-right mb-6">
//           <p className="font-bold">Subtotal: ${subtotal.toFixed(2)}</p>
//           <p className="font-bold">Tax (10%): ${tax.toFixed(2)}</p>
//           <h2 className="font-bold text-xl">Total: ${total.toFixed(2)}</h2>
//         </div>

//         {/* PDF Download Link */}
//         <PDFDownloadLink
//           document={
//             <PDFInvoice
//               logo={logo}
//               invoiceNumber={invoiceNumber}
//               invoiceDate={invoiceDate}
//               dueDate={dueDate}
//               billTo={billTo}
//               address={address}
//               items={items}
//               subtotal={subtotal}
//               tax={tax}
//               total={total}
//             />
//           }
//           fileName="invoice.pdf"
//         >
//           <button className="bg-green-500 text-white px-4 py-2 rounded">Download PDF</button>
//         </PDFDownloadLink>
//       </div>
//     </div>
//   );
// };

// // PDFInvoice component for PDF-only content
// const PDFInvoice = ({ logo, invoiceNumber, invoiceDate, dueDate, billTo, address, items, subtotal, tax, total }) => {
//   const styles = StyleSheet.create({
//     page: { padding: 30, fontFamily: "Helvetica", fontSize: 12 },
//     section: { marginBottom: 20 },
//     logo: { width: 100, height: 100, marginBottom: 20, alignSelf: "center" },
//     header: { fontSize: 24, fontWeight: "bold", textAlign: "center" },
//     text: { fontSize: 12, marginBottom: 6 },
//     bold: { fontWeight: "bold" },
//     table: { width: "100%", border: "1px solid black", marginTop: 10 },
//     tableHeader: { fontWeight: "bold", padding: 5, border: "1px solid black" },
//     itemRow: { display: "flex", flexDirection: "row" },
//     tableCell: { padding: 5, border: "1px solid black" },
//   });

//   return (
//     <Document>
//       <Page style={styles.page}>
//         {logo && <Image src={logo} style={styles.logo} />}
//         <Text style={styles.header}>Invoice</Text>
//         <View style={styles.section}>
//           <Text style={styles.text}>Invoice Number: <Text style={styles.bold}>{invoiceNumber}</Text></Text>
//           <Text style={styles.text}>Invoice Date: <Text style={styles.bold}>{invoiceDate}</Text></Text>
//           <Text style={styles.text}>Due Date: <Text style={styles.bold}>{dueDate}</Text></Text>
//         </View>
//         <View style={styles.section}>
//           <Text style={styles.text}>Bill To: <Text style={styles.bold}>{billTo}</Text></Text>
//           <Text style={styles.text}>Address: <Text style={styles.bold}>{address}</Text></Text>
//         </View>
//         <View style={styles.section}>
//           <Text style={styles.bold}>Items:</Text>
//           <View style={styles.table}>
//             <View style={styles.itemRow}>
//               <Text style={[styles.tableHeader, { width: "40%" }]}>Service</Text>
//               <Text style={[styles.tableHeader, { width: "30%" }]}>Description</Text>
//               <Text style={[styles.tableHeader, { width: "10%" }]}>Quantity</Text>
//               <Text style={[styles.tableHeader, { width: "10%" }]}>Price</Text>
//               <Text style={[styles.tableHeader, { width: "10%" }]}>Total</Text>
//             </View>
//             {items.map((item, index) => (
//               <View key={index} style={styles.itemRow}>
//                 <Text style={[styles.tableCell, { width: "40%" }]}>{item.service}</Text>
//                 <Text style={[styles.tableCell, { width: "30%" }]}>{item.description}</Text>
//                 <Text style={[styles.tableCell, { width: "10%" }]}>{item.quantity}</Text>
//                 <Text style={[styles.tableCell, { width: "10%" }]}>{item.price}</Text>
//                 <Text style={[styles.tableCell, { width: "10%" }]}>{(item.quantity * item.price).toFixed(2)}</Text>
//               </View>
//             ))}
//           </View>
//         </View>
//         <View style={styles.section}>
//           <Text style={styles.text}>Subtotal: <Text style={styles.bold}>${subtotal.toFixed(2)}</Text></Text>
//           <Text style={styles.text}>Tax (10%): <Text style={styles.bold}>${tax.toFixed(2)}</Text></Text>
//           <Text style={[styles.text, styles.bold]}>Total: ${total.toFixed(2)}</Text>
//         </View>
//       </Page>
//     </Document>
//   );
// };

// export default InvoiceGenerator;

import React, { useState } from "react";
import { PDFDownloadLink, Document, Page, Text, View, Image, StyleSheet } from "@react-pdf/renderer";

const InvoiceGenerator = () => {
  const [logo, setLogo] = useState(null);
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [billTo, setBillTo] = useState("");
  const [address, setAddress] = useState("");
  const [items, setItems] = useState([{ service: "", description: "", quantity: 1, price: 0 }]);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result); // Save base64 string as logo
      };
      reader.readAsDataURL(file); // Read file as base64
    }
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = items.map((item, i) => (i === index ? { ...item, [field]: value } : item));
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([...items, { service: "", description: "", quantity: 1, price: 0 }]);
  };

  const subtotal = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow-lg">
        {/* Logo Upload and Preview */}
        <div className="mb-6 text-center">
          <label className="block text-gray-700 text-sm font-medium mb-2">Upload Logo</label>
          <input type="file" onChange={handleLogoUpload} className="block mx-auto mb-4" />
          {logo && <img src={logo} alt="Logo" className="mx-auto w-32 h-32 object-contain" />}
        </div>

        {/* Invoice Form */}
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {/* Invoice Details */}
            <div>
              <label className="block text-gray-700">Invoice Number</label>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Invoice Date</label>
              <input
                type="date"
                value={invoiceDate}
                onChange={(e) => setInvoiceDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Due Date</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded"
              />
            </div>
          </div>

          {/* Billing Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-gray-700">Bill To</label>
              <input
                type="text"
                value={billTo}
                onChange={(e) => setBillTo(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700">Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded"
              />
            </div>
          </div>
        </div>

        {/* Items Table with Tailwind classes */}
        <table className="w-full table-auto border-collapse mb-6">
          <thead className="bg-gray-200">
            <tr>
              <th className="border-b py-3 px-4 text-left">Service</th>
              <th className="border-b py-3 px-4 text-left">Description</th>
              <th className="border-b py-3 px-4 text-left">Quantity</th>
              <th className="border-b py-3 px-4 text-left">Price</th>
              <th className="border-b py-3 px-4 text-left">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="hover:bg-gray-100">
                <td className="border-b py-3 px-4">
                  <input
                    type="text"
                    value={item.service}
                    onChange={(e) => handleItemChange(index, "service", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded"
                  />
                </td>
                <td className="border-b py-3 px-4">
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => handleItemChange(index, "description", e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded"
                  />
                </td>
                <td className="border-b py-3 px-4">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, "quantity", parseFloat(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded"
                  />
                </td>
                <td className="border-b py-3 px-4">
                  <input
                    type="number"
                    min="0"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, "price", parseFloat(e.target.value))}
                    className="w-full p-3 border border-gray-300 rounded"
                  />
                </td>
                <td className="border-b py-3 px-4">${(item.quantity * item.price).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={addItem}
          className="bg-blue-500 text-white px-4 py-2 rounded mb-6"
        >
          Add Item
        </button>

        {/* Totals */}
        <div className="text-right mb-6">
          <p className="font-bold">Subtotal: ${subtotal.toFixed(2)}</p>
          <p className="font-bold">Tax (10%): ${tax.toFixed(2)}</p>
          <h2 className="font-bold text-xl">Total: ${total.toFixed(2)}</h2>
        </div>

        {/* PDF Download Link */}
        <PDFDownloadLink
          document={
            <PDFInvoice
              logo={logo}
              invoiceNumber={invoiceNumber}
              invoiceDate={invoiceDate}
              dueDate={dueDate}
              billTo={billTo}
              address={address}
              items={items}
              subtotal={subtotal}
              tax={tax}
              total={total}
            />
          }
          fileName="invoice.pdf"
        >
          <button className="bg-green-500 text-white px-4 py-2 rounded">Download PDF</button>
        </PDFDownloadLink>
      </div>
    </div>
  );
};

// PDFInvoice component for PDF-only content
const PDFInvoice = ({ logo, invoiceNumber, invoiceDate, dueDate, billTo, address, items, subtotal, tax, total }) => {
  const styles = StyleSheet.create({
    page: { padding: 30, fontFamily: "Helvetica", fontSize: 12 },
    section: { marginBottom: 20 },
    logo: { width: 100, height: 100, marginBottom: 20, alignSelf: "center" },
    header: { fontSize: 24, fontWeight: "bold", textAlign: "center" },
    text: { fontSize: 12, marginBottom: 6 },
    bold: { fontWeight: "bold" },
    table: { width: "100%", border: "1px solid black", marginTop: 10 },
    tableHeader: { fontWeight: "bold", padding: 5, border: "1px solid black" },
    itemRow: { display: "flex", flexDirection: "row" },
    tableCell: { padding: 5, border: "1px solid black" },
  });

  return (
    <Document>
      <Page style={styles.page}>
        {logo && <Image src={logo} style={styles.logo} />}
        <Text style={styles.header}>Invoice #{invoiceNumber}</Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Invoice Date:</Text> {invoiceDate}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Due Date:</Text> {dueDate}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Bill To:</Text> {billTo}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Address:</Text> {address}
        </Text>

        {/* Invoice Table */}
        <View style={styles.table}>
          <View style={styles.itemRow}>
            <Text style={styles.tableHeader}>Service</Text>
            <Text style={styles.tableHeader}>Description</Text>
            <Text style={styles.tableHeader}>Quantity</Text>
            <Text style={styles.tableHeader}>Price</Text>
            <Text style={styles.tableHeader}>Total</Text>
          </View>
          {items.map((item, index) => (
            <View key={index} style={styles.itemRow}>
              <Text style={styles.tableCell}>{item.service}</Text>
              <Text style={styles.tableCell}>{item.description}</Text>
              <Text style={styles.tableCell}>{item.quantity}</Text>
              <Text style={styles.tableCell}>${item.price.toFixed(2)}</Text>
              <Text style={styles.tableCell}>${(item.quantity * item.price).toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.text}>
          <Text style={styles.bold}>Subtotal:</Text> ${subtotal.toFixed(2)}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Tax (10%):</Text> ${tax.toFixed(2)}
        </Text>
        <Text style={[styles.text, styles.bold]}>Total: ${total.toFixed(2)}</Text>
      </Page>
    </Document>
  );
};

export default InvoiceGenerator;


