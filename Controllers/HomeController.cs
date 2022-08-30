using Belajar.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Diagnostics;


namespace Belajar.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View("Index");
        }

        public IActionResult DevExtreme()
        {
            return View("DevExtreme");
        }

        [HttpGet]
        public JsonResult GetOrderList()
        {
            Order dataOrder = new Order();

            return new JsonResult(dataOrder.GetMyData());
        }

        [HttpGet]
        public JsonResult GetCustomerList()
        {
            Customer dataCustomer = new Customer();

            return new JsonResult(dataCustomer.GetMyData());
        }

        //CRUD ORDER
        [HttpPost]
        public ActionResult CreateOrder(Order objOrder)
        {
            Order dataOrder = new Order();

            dataOrder.CreateMyData(objOrder, dataOrder.GetMaxID());

            return new JsonResult("Success");
        }

        [HttpGet]
        public JsonResult ReadOrder(int id)
        {
            Order dataOrder = new Order();
            dataOrder.order_num = id;

            return new JsonResult(dataOrder.GetMyDataById());
        }

        [HttpPost]
        public ActionResult UpdateOrder(Order objOrder)
        {
            Order dataOrder = new Order();

            dataOrder.UpdateMyData(objOrder);

            return new JsonResult("Success");
        }

        [HttpPost]
        public ActionResult DeleteOrder(int id)
        {
            Order dataOrder = new Order();

            dataOrder.DeleteMyData(id);

            return new JsonResult("Success");
        }

        //CRUD CUSTOMER
        [HttpPost]
        public ActionResult CreateCustomer(Customer objCustomer)
        {
            Customer dataCustomer = new Customer();

            dataCustomer.CreateMyData(objCustomer, dataCustomer.GetMaxID());

            return new JsonResult("Success");
        }

        [HttpGet]
        public JsonResult ReadCustomer(int id)
        {
            Customer dataCustomer = new Customer();

            return new JsonResult(dataCustomer.GetMyDataById(id));
        }

        [HttpPost]
        public ActionResult UpdateCustomer(Customer objCustomer)
        {
            Customer dataCustomer = new Customer();

            dataCustomer.UpdateMyData(objCustomer);

            return new JsonResult("Success");
        }

        [HttpPost]
        public ActionResult DeleteCustomer(int id)
        {
            Customer dataCustomer = new Customer();

            dataCustomer.DeleteMyData(id);

            return new JsonResult("Success");
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
