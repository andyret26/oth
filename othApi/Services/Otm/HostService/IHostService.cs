using Host = othApi.Data.Entities.Otm.Host;
namespace othApi.Services.Otm.HostService;

public interface IHostService
{
    Task<Host> AddAsync(Host host);
    Task<Host?> GetByIdAsync(int id);
    List<Host> GetAsync();
    Task<Host?> DeleteAsync(int id);
    Task<Host?> UpdateAsync(int id, Host host);

}