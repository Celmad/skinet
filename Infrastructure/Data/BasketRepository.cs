using System.Text.Json;
using Core.Entities;
using Core.Interfaces;
using StackExchange.Redis;

namespace Infrastructure.Data
{
    public class BasketRepository : IBasketRepository
    {
        private readonly IDatabase _db;

        public BasketRepository(IConnectionMultiplexer redis)
        {
            _db = redis.GetDatabase();
        }

        public async Task<CustomerBasket> GetBasketAsync(string id)
        {
            var data = await _db.StringGetAsync(id);
            return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<CustomerBasket>(data);
        }

        public async Task<CustomerBasket> UpdateBasketAsync(CustomerBasket basket)
        {
            var created = await _db.StringSetAsync(
                basket.Id, 
                JsonSerializer.Serialize(basket), TimeSpan.FromDays(7));

            if (!created) return null;

            return await GetBasketAsync(basket.Id);
        }

        public async Task<bool> DeleteBasketAsync(string id)
        {
            return await _db.KeyDeleteAsync(id);
        }
    }
}