# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: ui\e2e.spec.ts >> Example E2E test
- Location: tests\ui\e2e.spec.ts:8:5

# Error details

```
Test timeout of 35000ms exceeded.
```

```
Error: locator.click: Test timeout of 35000ms exceeded.
Call log:
  - waiting for locator('.btnn.action__submit.ng-star-inserted')
    - locator resolved to <a _ngcontent-err-c40="" class="btnn action__submit ng-star-inserted">…</a>
  - attempting click action
    - waiting for element to be visible, enabled and stable
    - element is visible, enabled and stable
    - scrolling into view if needed
    - done scrolling
    - performing click action

```

# Page snapshot

```yaml
- generic [ref=e3]:
  - navigation [ref=e5]:
    - generic [ref=e7]:
      - link "Automation Automation Practice":
        - /url: ""
        - generic [ref=e8]:
          - heading "Automation" [level=3] [ref=e9]
          - paragraph [ref=e10]: Automation Practice
    - text: 
    - link "🎯 I'll help you prepare for your next QA job — Explore the QA Career Accelerator." [ref=e11] [cursor=pointer]:
      - /url: https://rahulshettyacademy.com/qa-career-accelerator-job-ready
    - list [ref=e12]:
      - listitem [ref=e13] [cursor=pointer]:
        - button " HOME" [ref=e14]:
          - generic [ref=e15]: 
          - text: HOME
      - listitem
      - listitem [ref=e16] [cursor=pointer]:
        - button " ORDERS" [ref=e17]:
          - generic [ref=e18]: 
          - text: ORDERS
      - listitem [ref=e19] [cursor=pointer]:
        - button " Cart 1" [ref=e20]:
          - generic [ref=e21]: 
          - text: Cart
          - generic [ref=e22]: "1"
      - listitem [ref=e23] [cursor=pointer]:
        - button "Sign Out" [ref=e24]:
          - generic [aria-hidden] [ref=e25]: 
          - text: Sign Out
  - generic [ref=e28]:
    - generic [ref=e32]:
      - generic [ref=e33]: ADIDAS ORIGINAL
      - generic [ref=e34]: $ 11500
      - generic [ref=e35]: "Quantity: 1"
      - list [ref=e37]:
        - listitem [ref=e38]: Apple phone
    - generic [ref=e41]:
      - generic [ref=e42]: Payment Method
      - generic [ref=e43]:
        - generic [ref=e44] [cursor=pointer]: Credit Card
        - generic [ref=e45] [cursor=pointer]: Paypal
        - generic [ref=e46] [cursor=pointer]: SEPA
        - generic [ref=e47] [cursor=pointer]: Invoice
      - generic [ref=e48]:
        - generic [ref=e49]:
          - generic [ref=e50]: Personal Information
          - generic [ref=e52]:
            - generic [ref=e54]:
              - generic [ref=e55]: Credit Card Number
              - textbox [ref=e56]: 4542 9931 9292 2293
            - generic [ref=e57]:
              - generic [ref=e58]:
                - generic [ref=e59]: Expiry Date
                - combobox [ref=e60]:
                  - option "01" [selected]
                  - option "02"
                  - option "03"
                  - option "04"
                  - option "05"
                  - option "06"
                  - option "07"
                  - option "08"
                  - option "09"
                  - option "10"
                  - option "11"
                  - option "12"
                - combobox [ref=e61]:
                  - option "01"
                  - option "02"
                  - option "03"
                  - option "04"
                  - option "05"
                  - option "06"
                  - option "07"
                  - option "08"
                  - option "09"
                  - option "10"
                  - option "11"
                  - option "12"
                  - option "13"
                  - option "14"
                  - option "15"
                  - option "16" [selected]
                  - option "17"
                  - option "18"
                  - option "19"
                  - option "20"
                  - option "21"
                  - option "22"
                  - option "23"
                  - option "24"
                  - option "25"
                  - option "26"
                  - option "27"
                  - option "28"
                  - option "29"
                  - option "30"
                  - option "31"
              - generic [ref=e62]:
                - generic [ref=e63]: CVV Code ?
                - textbox [ref=e64]: "121"
            - generic [ref=e66]:
              - generic [ref=e67]: Name on Card
              - textbox [ref=e68]: Anshika
            - generic [ref=e69]:
              - generic [ref=e70]:
                - generic [ref=e71]: Apply Coupon
                - textbox [ref=e72]
              - button "Apply Coupon" [ref=e75] [cursor=pointer]
        - generic [ref=e76]:
          - generic [ref=e77]: Shipping Information
          - generic [ref=e79]:
            - generic [ref=e80]: fermin.oreilly@hotmail.com
            - textbox [ref=e81]: fermin.oreilly@hotmail.com
            - textbox "Select Country" [ref=e84]: India
            - generic [ref=e85]: Place Order
```

# Test source

```ts
  1  | import { Page, Locator } from "@playwright/test";
  2  | 
  3  | export class CheckoutPage {
  4  |   private readonly page: Page;
  5  | 
  6  |   private readonly cvvCode: Locator;
  7  |   private readonly nameOnCard: Locator;
  8  |   private readonly selectCountryField: Locator;
  9  |   private readonly countryOptions: Locator;
  10 |   private readonly countryDropdown: Locator;
  11 |   private readonly placeOrderLink: Locator;
  12 | 
  13 |   constructor(page: Page) {
  14 |     this.page = page;
  15 | 
  16 |     this.cvvCode = this.page.locator('[class="input txt"]').first();
  17 | 
  18 |     this.nameOnCard = this.page.locator('[class="input txt"]').nth(1);
  19 | 
  20 |     this.selectCountryField = this.page.getByPlaceholder("Select Country");
  21 | 
  22 |     this.countryOptions = this.page.locator(".ta-results button");
  23 | 
  24 |     this.countryDropdown = this.page.locator(".ta-results");
  25 | 
  26 |     this.placeOrderLink = this.page.locator(
  27 |       ".btnn.action__submit.ng-star-inserted",
  28 |     );
  29 |   }
  30 | 
  31 |   async enterCVV(cvv: string) {
  32 |     await this.cvvCode.fill(cvv);
  33 |   }
  34 | 
  35 |   async enterNameOnCard(name: string) {
  36 |     await this.nameOnCard.fill(name);
  37 |   }
  38 | 
  39 |   async selectCountry(country: string) {
  40 |     await this.selectCountryField.pressSequentially(country.substring(0, 3), {
  41 |       delay: 100,
  42 |     });
  43 | 
  44 |     await this.countryOptions.first().waitFor();
  45 | 
  46 |     await this.countryDropdown.waitFor();
  47 | 
  48 |     const countCountries = await this.countryOptions.count();
  49 | 
  50 |     for (let i = 0; i < countCountries; i++) {
  51 |       const countryName = (
  52 |         await this.countryOptions.nth(i).textContent()
  53 |       )?.trim();
  54 | 
  55 |       if (countryName === country) {
  56 |         await this.countryOptions.nth(i).click();
  57 |         break;
  58 |       }
  59 |     }
  60 |   }
  61 | 
  62 |   async clickPlaceOrder() {
> 63 |     await this.placeOrderLink.click();
     |                               ^ Error: locator.click: Test timeout of 35000ms exceeded.
  64 |   }
  65 | }
  66 | 
```