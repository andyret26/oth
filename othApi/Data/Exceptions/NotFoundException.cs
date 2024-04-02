namespace othApi.Data.Exceptions
{
    [Serializable]
    public class NotFoundException : Exception
    {
        public NotFoundException() : base()
        {
        }
        public NotFoundException(string type, int id) : base($"{type} with id {id} not found")
        {
        }
    }
}