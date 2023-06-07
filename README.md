This is a [Next.js](https://nextjs.org/) project bootstrapped
with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

### Setup

```bash
docker-compose up
```

```bash
npm install
```

### Task 1

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000/api/phones](http://localhost:3000/api/phones) in the browser.

#### Queries

Sample queries:

```
query SampleQueries($phoneId: ID!) {
  phone(id: $phoneId) {
    id
    name
    manufacturer {
      id
      name
    }
  }
  manufacturers {
    id
    name
  }
  phones {
    id
    name
  }
}
```

Variables:

```
{
  "phoneId": "<PHONE_ID>"
}
```

#### Mutations

##### Add Manufacturer

```
mutation AddManufacturer($input: AddManufacturerInput!) {
  addManufacturer(input: $input) {
    ... on Manufacturer {
      id
      name
    }
    ... on MutationError {
      message
    }
  }
}
```

Variables:

```
{
  "input": {
    "name": "Apple"
  }
}
```

##### Add Phone

An existing manufacturer must be referenced for a phone to be added.

```
mutation AddPhone($input: AddPhoneInput!) {
  addPhone(input: $input) {
    ... on Phone {
      id
      name
      manufacturer {
        id
        name
      }
    }
    ... on MutationError {
      message
    }
  }
}
```

Variables:

```
{
  "input": {
    "manufacturer": "<MANUFACTURER_ID>",
    "name": "iPhone X"
  }
}
```

### Task 2

First, seed the database:

```bash
npm run schedule:seed
```

Then, run schedule:

```bash
npm run schedule:start
```

For manual testing run:

```bash
npm run schedule:cli <INPUT_DATE>
```

Where `INPUT_DATE` needs to be a parseable date string according
to [specifications](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date#date_time_string_format),
i.e. `YYYY-MM-DDTHH:mm:ss.sssZ` where the `:ss.sss`-part is optional. Comparison will be done using UTC time so to
reduce confusion please use UTC time for input.
<br>_NB_ Please note that any date will do, only the hours of the day matter for comparison. For example

```bash
npm run schedule:cli 2019-01-01T01:00Z
```

Is considered a valid date and will run.

####
