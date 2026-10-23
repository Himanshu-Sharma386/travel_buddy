Configuring external Hotels provider (RapidAPI)

This project supports an optional RapidAPI-based hotels provider. By default `hotels.provider` is set to `mock` and the application returns built-in mocked hotels.

To enable RapidAPI provider:

1. Obtain a RapidAPI key and the host name for the hotels endpoint (for example, some providers use `hotels4.p.rapidapi.com`).
2. Set the application properties (either in `application.properties` or as environment variables):

- `hotels.provider=rapidapi`
- `hotels.rapidapi.host=YOUR_RAPIDAPI_HOST` (or set env `HOTELS_RAPIDAPI_HOST`)
- `hotels.rapidapi.key=YOUR_RAPIDAPI_KEY` (or set env `HOTELS_RAPIDAPI_KEY`)

Example environment (Windows PowerShell):

```
$Env:HOTELS_RAPIDAPI_HOST = 'hotels4.p.rapidapi.com'
$Env:HOTELS_RAPIDAPI_KEY = 'your-rapidapi-key'
```

Notes:
- The adapter in `TravelService.getHotels()` attempts a best-effort mapping of the provider response to the app's hotel schema. You may need to adjust mappings depending on the exact provider response shape.
- If the external provider call fails or is not configured, the service falls back to mocked hotels.
- Do not commit API keys to source control; use environment variables or a secure secrets manager.

If you'd like, I can wire a specific RapidAPI provider (e.g., Booking, Hotels API) if you tell me which one and provide example response structure or the API docs.
