using Google.Apis.Auth.OAuth2;
using Google.Apis.Services;
using Google.Apis.Sheets.v4;
using Google.Apis.Sheets.v4.Data;
using System;
using System.Collections.Generic;
using System.IO;


namespace othApi.Utils;

public class FetchData
{
    public static List<string> FetchSheetData()
    {
        // Replace 'YOUR_SHEET_ID' with the ID of your Google Sheets spreadsheet.
        string spreadsheetId = "1_bHCphMWXDwOsl0wqi44D41XnVMN2Q696IO9OPlx8GU";

        // Replace 'YOUR_CREDENTIALS_FILE.json' with the path to your JSON credentials file.
        string credentialsFilePath = "creds.json";

        // Initialize Google Sheets API service.
        SheetsService service = GetSheetsService(credentialsFilePath);

        // Define the range from which you want to fetch data (e.g., "Sheet1!A1:B2").
        string range = "Mappool!D6:D22";

        // Fetch data from the spreadsheet.
        IList<IList<Object>> values = GetDataFromSheet(service, spreadsheetId, range);

        var res = new List<string>();
        if (values != null && values.Count > 0)
        {
            foreach (var row in values)
            {
                foreach (var item in row)
                {
                    var title = item.ToString()!.Split(" - ")[1];
                    res.Add(title);
                }
            }
        }
        else
        {
            Console.WriteLine("No data found.");
        }

        return res;
    }

    private static SheetsService GetSheetsService(string credentialsFilePath)
    {
        GoogleCredential credential;
        using (var stream = new FileStream(credentialsFilePath, FileMode.Open, FileAccess.Read))
        {
            credential = GoogleCredential.FromStream(stream)
                .CreateScoped(SheetsService.Scope.SpreadsheetsReadonly);
        }

        // Create Google Sheets API service.
        var service = new SheetsService(new BaseClientService.Initializer()
        {
            HttpClientInitializer = credential,
            ApplicationName = "Google Sheets API C# Example",
        });

        return service;
    }

    private static IList<IList<Object>> GetDataFromSheet(SheetsService service, string spreadsheetId, string range)
    {
        SpreadsheetsResource.ValuesResource.GetRequest request =
            service.Spreadsheets.Values.Get(spreadsheetId, range);

        ValueRange response = request.Execute();
        IList<IList<Object>> values = response.Values;

        return values;
    }
}