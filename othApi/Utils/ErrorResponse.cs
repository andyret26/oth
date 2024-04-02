// make this: new  {title = "Conflict", status = 409, detail = "Host already exists"} into a function
// and make it so i can just do new ErrorResponse("Conflict", 409, "Host already exists") in controller

namespace othApi.Utils
{
    public class ErrorResponse
    {
        public string Title { get; set; }
        public int Status { get; set; }
        public string Detail { get; set; }

        public ErrorResponse(string title, int status, string detail)
        {
            Title = title;
            Status = status;
            Detail = detail;
        }

    }
}
