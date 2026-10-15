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
  - waiting for locator('[routerlink="/dashboard/cart"]')
    - locator resolved to <button tabindex="0" _ngcontent-epy-c38="" class="btn btn-custom" routerlink="/dashboard/cart">…</button>
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
        - generic [ref=e8] [cursor=pointer]:
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
  - text:    
  - generic [ref=e26]:
    - paragraph [ref=e27]: Home | Search
    - heading "Filters" [level=4] [ref=e29]
    - generic [ref=e30]:
      - textbox "search" [ref=e32]
      - generic [ref=e33]:
        - heading "Price Range" [level=6] [ref=e34]
        - generic [ref=e35]:
          - textbox "Min Price" [ref=e37]
          - textbox "Max Price" [ref=e39]
      - generic [ref=e40]:
        - heading "Categories" [level=6] [ref=e41]
        - generic [ref=e42]: 
        - generic [ref=e44]:
          - checkbox [ref=e45]
          - generic [ref=e46]: fashion
        - generic [ref=e47]:
          - checkbox [ref=e48]
          - generic [ref=e49]: electronics
        - generic [ref=e50]:
          - checkbox [ref=e51]
          - generic [ref=e52]: household
      - generic [ref=e53]:
        - heading "Sub Categories" [level=6] [ref=e54]
        - generic [ref=e55]: 
        - generic [ref=e57]:
          - checkbox [ref=e58]
          - generic [ref=e59]: t-shirts
        - generic [ref=e60]:
          - checkbox [ref=e61]
          - generic [ref=e62]: shirts
        - generic [ref=e63]:
          - checkbox [ref=e64]
          - generic [ref=e65]: shoes
        - generic [ref=e66]:
          - checkbox [ref=e67]
          - generic [ref=e68]: mobiles
        - generic [ref=e69]:
          - checkbox [ref=e70]
          - generic [ref=e71]: laptops
      - generic [ref=e72]:
        - heading "Search For" [level=6] [ref=e73]
        - generic [ref=e74]: 
        - generic [ref=e76]:
          - checkbox [ref=e77]
          - generic [ref=e78]: men
        - generic [ref=e79]:
          - checkbox [ref=e80]
          - generic [ref=e81]: women
  - generic [ref=e82]:
    - generic [ref=e83]:
      - generic [ref=e84]:
        - generic [ref=e85]: Showing 3 results |
        - generic [ref=e86]: User can only see maximum 9 products on a page
      - generic [ref=e87]:
        - generic [ref=e91]:
          - heading "ADIDAS ORIGINAL" [level=5] [ref=e92]
          - generic [ref=e93]: $ 11500
          - button "View" [ref=e95] [cursor=pointer]:
            - generic [aria-hidden] [ref=e96]: 
            - text: View
          - button " Add To Cart" [active] [ref=e97] [cursor=pointer]:
            - generic [ref=e98]: 
            - text: Add To Cart
        - generic [ref=e102]:
          - heading "ZARA COAT 3" [level=5] [ref=e103]
          - generic [ref=e104]: $ 11500
          - button "View" [ref=e106] [cursor=pointer]:
            - generic [aria-hidden] [ref=e107]: 
            - text: View
          - button " Add To Cart" [ref=e108] [cursor=pointer]:
            - generic [ref=e109]: 
            - text: Add To Cart
        - generic [ref=e113]:
          - heading "iphone 13 pro" [level=5] [ref=e114]
          - generic [ref=e115]: $ 55000
          - button "View" [ref=e117] [cursor=pointer]:
            - generic [aria-hidden] [ref=e118]: 
            - text: View
          - button " Add To Cart" [ref=e119] [cursor=pointer]:
            - generic [ref=e120]: 
            - text: Add To Cart
    - list "Pagination" [ref=e125]:
      - listitem [ref=e126]:
        - text: «
        - generic [ref=e127]:
          - text: Previous
          - generic [ref=e128]: page
      - listitem [ref=e129]:
        - generic [ref=e130]: You're on page
        - text: "1"
      - listitem [ref=e131]:
        - generic [ref=e132]:
          - text: Next
          - generic [ref=e133]: page
        - text: »
  - generic [ref=e134]: Design and Developed By - Kunal Sharma
```

# Test source

```ts
  1   | import { Page, Locator, expect } from "@playwright/test";
  2   | 
  3   | export class HomePage {
  4   |   private readonly page: Page;
  5   |   private readonly homeBtn: Locator;
  6   |   private readonly homePageLocator: Locator;
  7   |   private readonly productCards: Locator;
  8   |   private readonly productNames: Locator;
  9   |   private readonly cartIcon: Locator;
  10  |   private readonly spinner: Locator;
  11  |   private readonly childPageLink: Locator;
  12  |   private readonly signOutBtn: Locator;
  13  |   private readonly ordersBtn: Locator;
  14  |   private readonly searchOption: Locator;
  15  | 
  16  |   constructor(page: Page) {
  17  |     this.page = page;
  18  | 
  19  |     this.productCards = this.page.locator(".card");
  20  | 
  21  |     this.productNames = this.page.locator(".card b");
  22  | 
  23  |     this.cartIcon = this.page.locator('[routerlink="/dashboard/cart"]');
  24  | 
  25  |     this.spinner = this.page.locator(".ngx-spinner-overlay");
  26  | 
  27  |     this.childPageLink = this.page.getByRole("link", {
  28  |       name: "🎯 I'll help you prepare for your next QA job — Explore the QA Career Accelerator.",
  29  |     });
  30  | 
  31  |     this.signOutBtn = this.page.getByRole("button", {
  32  |       name: "Sign Out",
  33  |     });
  34  | 
  35  |     this.ordersBtn = this.page.getByRole("button", { name: "ORDERS" });
  36  | 
  37  |     this.homeBtn = this.page.getByRole("button", { name: "HOME" });
  38  | 
  39  |     this.homePageLocator = this.page
  40  |       .locator("//p[contains(normalize-space(), 'Home')]")
  41  |       .nth(1);
  42  | 
  43  |     this.searchOption = this.page.getByRole("textbox", { name: "search" });
  44  |   }
  45  | 
  46  |   async clickHomeBtn() {
  47  |     await this.homeBtn.click();
  48  |   }
  49  | 
  50  |   async isHomePage(): Promise<void> {
  51  |     await expect(this.homeBtn).toBeVisible();
  52  |   }
  53  | 
  54  |   async verifyUserIsLoggedIn(): Promise<void> {
  55  |     await expect(this.signOutBtn).toBeVisible({
  56  |       timeout: 30000,
  57  |     });
  58  |   }
  59  | 
  60  |   async addProductToCart(productName: string) {
  61  |     await this.productCards
  62  |       .filter({
  63  |         has: this.page.locator("b", {
  64  |           hasText: productName,
  65  |         }),
  66  |       })
  67  |       .getByRole("button", {
  68  |         name: "Add To Cart",
  69  |       })
  70  |       .click();
  71  | 
  72  |     await this.spinner.waitFor({
  73  |       state: "hidden",
  74  |     });
  75  |   }
  76  | 
  77  |   async getAllProductNames() {
  78  |     return await this.productNames.allTextContents();
  79  |   }
  80  | 
  81  |   async goToCart() {
> 82  |     await this.cartIcon.click();
      |                         ^ Error: locator.click: Test timeout of 35000ms exceeded.
  83  |   }
  84  | 
  85  |   async openQACareerLink() {
  86  |     return this.childPageLink.click();
  87  |   }
  88  | 
  89  |   async clickOrders() {
  90  |     await this.ordersBtn.click();
  91  |   }
  92  | 
  93  |   async clickOnSearchOption() {
  94  |     await expect(this.searchOption).toBeVisible();
  95  |     await this.searchOption.click();
  96  |   }
  97  | 
  98  |   async clickOnSignOutBtn() {
  99  |     await this.signOutBtn.click();
  100 |   }
  101 | }
  102 | 
```