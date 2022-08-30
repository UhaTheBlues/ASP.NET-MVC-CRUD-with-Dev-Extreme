using Advantage.Data.Provider;
using System.Collections.Generic;
using System.Data;
using System.Linq;

namespace Belajar.Models
{
    public class Customer
    {
        public int id { get; set; }
        public string cust_id { get; set; }
        public string cust_name { get; set; }
        private int MaxID { get; set; }

        //Ambil semua data
        public List<Customer> GetMyData()
        {
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            AdsConnection conn = new AdsConnection("data source=C:\\Database;" + "ServerType=local; TableType=ADT");
            conn.Open();

            AdsDataAdapter da = new AdsDataAdapter("SELECT * FROM customers ORDER BY id ASC", conn);

            DataSet ds = new DataSet();
            da.Fill(ds, "Customers");
            da.Dispose();

            conn.Close();

            List<Customer> listCustomer = (ds.Tables[0].AsEnumerable()
                .Select(datarow => new Customer()
                {
                    id = datarow.Field<int>("id"),
                    cust_id = datarow.Field<string>("cust_id").Replace(" ", ""),
                    cust_name = datarow.Field<string>("cust_name").Replace(" ", ""),
                })).ToList();

            return listCustomer;
        }

        //Mendapatkan ID Terakhir agar dapat di tambahkan dengan C0+ID Terakhir
        public int GetMaxID()
        {
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            AdsConnection conn = new AdsConnection("data source=C:\\Database;" + "ServerType=local; TableType=ADT");
            AdsCommand cmd;
            AdsDataReader reader;
            int iField;

            conn.Open();
            cmd = conn.CreateCommand();
            cmd.CommandText = "SELECT MAX(id) FROM customers";

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
        public string CreateMyData(Customer objCustomer, int MaxID)
        {
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            AdsConnection conn = new AdsConnection("data source=C:\\Database;" + "ServerType=local; TableType=ADT");
            conn.Open();

            AdsDataAdapter da = new AdsDataAdapter("INSERT INTO customers VALUES (" + objCustomer.id + ",'C0" + MaxID + "','" + objCustomer.cust_name + "')", conn);

            DataSet ds = new DataSet();
            da.Fill(ds, "Customers");

            da.Dispose();
            conn.Close();

            return "Success";
        }

        //Read atau lihat data
        public DataSet GetMyDataById(int id)
        {
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            AdsConnection conn = new AdsConnection("data source=C:\\Database;" + "ServerType=local; TableType=ADT");
            conn.Open();

            AdsDataAdapter da = new AdsDataAdapter("SELECT * FROM customers WHERE id=" + id + "", conn);

            DataSet ds = new DataSet();
            da.Fill(ds, "Customers");

            da.Dispose();
            conn.Close();

            return ds;
        }

        //Update atau edit data
        public string UpdateMyData(Customer objCustomer)
        {
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);

            AdsConnection conn = new AdsConnection("data source=C:\\Database;" + "ServerType=local; TableType=ADT");
            conn.Open();

            AdsDataAdapter da = new AdsDataAdapter("UPDATE customers SET cust_name='" + objCustomer.cust_name + "' WHERE id=" + objCustomer.id + "", conn);

            DataSet ds = new DataSet();
            da.Fill(ds, "Customers");

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

            AdsDataAdapter da = new AdsDataAdapter("DELETE FROM customers WHERE id=" + id + "", conn);

            DataSet ds = new DataSet();
            da.Fill(ds, "Customers");

            da.Dispose();
            conn.Close();

            return "Success";
        }

    }
}
