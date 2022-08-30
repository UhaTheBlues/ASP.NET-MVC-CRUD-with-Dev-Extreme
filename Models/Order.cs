using Advantage.Data.Provider;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace Belajar.Models
{
    public class Order
    {
        public int id { get; set; }
        public int order_num { get; set; }
        public DateTime date { get; set; }
        public string cust_id { get; set; }
        public int total_rp { get; set; }
        public string cust_name { get; set; }
        private int MaxID { get; set; }

        public List<Order> GetMyData()
        {
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            AdsConnection conn = new AdsConnection("data source=C:\\Database;" + "ServerType=local; TableType=ADT");
            conn.Open();

            AdsDataAdapter da = new AdsDataAdapter("SELECT * FROM orders o INNER JOIN customers c ON c.cust_id = o.cust_id ORDER BY order_num ASC", conn);

            DataSet ds = new DataSet();
            da.Fill(ds, "Orders");
            da.Dispose();
            
            conn.Close();

            List<Order> listOrder = (ds.Tables[0].AsEnumerable()
                .Select(datarow => new Order()
                {
                    id = datarow.Field<int>("id"),
                    order_num = datarow.Field<int>("order_num"),
                    cust_id = datarow.Field<string>("cust_id").Replace(" ", ""),
                    date = datarow.Field<DateTime>("date"),
                    total_rp = datarow.Field<int>("total_rp"),
                    cust_name = datarow.Field<string>("cust_name").Replace(" ", ""),
                })).ToList();

            return listOrder;
        }

        public int GetMaxID()
        {
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            AdsConnection conn = new AdsConnection("data source=C:\\Database;" + "ServerType=local; TableType=ADT");
            AdsCommand cmd;
            AdsDataReader reader;
            int iField;

            conn.Open();
            cmd = conn.CreateCommand();
            cmd.CommandText = "SELECT MAX(id) FROM orders";

            reader = cmd.ExecuteReader();
            while (reader.Read())
            {
                for (iField = 0; iField < reader.FieldCount; iField++)
                {
                    MaxID = (int)reader.GetValue(iField);
                }
            }
            conn.Close();

            return MaxID + 1;
        }

        //Create atau tambah data
        public string CreateMyData(Order objOrder, int MaxID)
        {
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            AdsConnection conn = new AdsConnection("data source=C:\\Database;" + "ServerType=local; TableType=ADT");
            conn.Open();

            string NewDate = objOrder.date.ToString("yyyy-MM-dd");
            AdsDataAdapter da = new AdsDataAdapter("INSERT INTO orders VALUES (" + objOrder.id + "," + MaxID + ",'" + NewDate + "','" + objOrder.cust_id + "', " + objOrder.total_rp + ")", conn);

            DataSet ds = new DataSet();
            da.Fill(ds, "Orders");

            da.Dispose();
            conn.Close();

            return "Success";
        }

        //Read atau lihat data
        public DataSet GetMyDataById()
        {
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            AdsConnection conn = new AdsConnection("data source=C:\\Database;" + "ServerType=local; TableType=ADT");
            conn.Open();

            AdsDataAdapter da = new AdsDataAdapter("SELECT * FROM orders o INNER JOIN customers c ON c.cust_id = o.cust_id WHERE order_num=" + order_num + "", conn);

            DataSet ds = new DataSet();
            da.Fill(ds, "Orders");

            da.Dispose();
            conn.Close();

            return ds;
        }

        //Update atau edit data
        public string UpdateMyData(Order objOrder)
        {
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            AdsConnection conn = new AdsConnection("data source=C:\\Database;" + "ServerType=local; TableType=ADT");
            conn.Open();
           
            var NewDate = objOrder.date.ToString("yyyy-MM-dd");
            AdsDataAdapter da = new AdsDataAdapter("UPDATE orders SET date='" + NewDate + "', cust_id= '" + objOrder.cust_id + "', total_rp =" + objOrder.total_rp + " WHERE id=" + objOrder.id + "", conn);

            DataSet ds = new DataSet();
            da.Fill(ds, "Orders");

            da.Dispose();
            conn.Close();

            return "Success";
        }

        //Delete atau hapus data
        public string DeleteMyData(int id)
        {
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            AdsConnection conn = new AdsConnection("data source=C:\\Database;" + "ServerType=local; TableType=ADT");
            conn.Open();

            AdsDataAdapter da = new AdsDataAdapter("DELETE FROM orders WHERE id=" + id + "", conn);

            DataSet ds = new DataSet();
            da.Fill(ds, "Orders");

            da.Dispose();
            conn.Close();

            return "Success";
        }
    }
}
