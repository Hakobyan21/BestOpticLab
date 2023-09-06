import bCrypt from 'bcryptjs';
// NPM Modules
import knex from 'knex';
import knexConfigs from '../../knex.configs';
import config from '../../src/config/variables.config';

const { SUPERADMIN_PASSWORD, API } = config;
const { TASKS } = config
async function seed(pg) {
    // Deletes ALL existing entries
    await pg('users').truncate();
    // Deletes ALL existing entries with cascade.

    // Inserts seed entries

    await pg('admins').insert([
        {
            id: 1,
            username: 'superadmin',
            password: bCrypt.hashSync(SUPERADMIN_PASSWORD, bCrypt.genSaltSync(10), null),
            role: 'superAdmin',
            created_at: new Date().toISOString(),
        }
    ]);

    await pg('superLogin').insert([
        {
            id: 1,
            title: 'WELCOME TO BEST OPTIC LAB, INC',
            login_title: 'Login',
            password_title: 'Password',
            signUp_title: 'Sign Up',
            registration_title: 'Registration',
            remember_title: 'Remember',
            signIn_title: 'Sign In',
            loginBg_color: '#2C3034',
            login_color: '#fff',
            buttonBg_color: '#06554D',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        }
    ]);

    await pg('supersettings').insert([
        {
            id: 1,
            logo: 'logo',
            address: 'address',
            director: 'director',
            company_name: 'name',
            company_address: 'caddress',
            paypal: false,
            google_pay: false,
            stripe: false,
            login_version1: false,
            login_version2: false,
            login_version3: false,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        }
    ]);

    await pg('superstyles').insert([
        {
            title_div: 'Mirror Coating',
            title: 'Mirror Coating',
            text: 'Best Optic Lab mirror colors are available in 9 eye-catching and attractive color in both solid and flash densities. Solid mirror coatings have a higher percentage of luminous reflectance than their corresponding flash mirror colors. The flash mirror generally has a hind of the color whereas a solid mirror shows a higher concentration of the color.',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },

        {
            title_div: 'Mirror Coating',
            title: 'Available Mirror Colors',
            text: 'Black, Blue, Cobalt, Green, Gold, Orange, Pink, Red, Silver',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },
  

        {
            title_div: 'Mirror Colors',
            title: 'BLACK',
            text: 'A classic dark and smoky mirror best for sun lenses',
            color: '#000000',
            note: 'Note: The lens images above are only representations of the actual color. Actual lens colors and appearance will vary based on lighting conditions, applied base tint color, and viewing angles. Mirror color illustrations shown above are for solid mirrors only. Flash mirrors are now shown in the illustrations above.',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },

        {
            title_div: 'Mirror Colors',
            title: 'BLUE',
            text: 'A chill blue color for a stylish and trendy look',
            color: '#0000ff',
            note: 'Note: The lens images above are only representations of the actual color. Actual lens colors and appearance will vary based on lighting conditions, applied base tint color, and viewing angles. Mirror color illustrations shown above are for solid mirrors only. Flash mirrors are now shown in the illustrations above.',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },

        {
            title_div: 'Mirror Colors',
            title: 'COBALT',
            text: 'A soft sapphire shade for a soothing cosmetic appearance',
            color: '#0047ab',
            note: 'Note: The lens images above are only representations of the actual color. Actual lens colors and appearance will vary based on lighting conditions, applied base tint color, and viewing angles. Mirror color illustrations shown above are for solid mirrors only. Flash mirrors are now shown in the illustrations above.',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },

        {
            title_div: 'Mirror Colors',
            title: 'ORANGE',
            text: 'A fresh tropical look for a vibrant personality',
            color: '#ffa500',
            note: 'Note: The lens images above are only representations of the actual color. Actual lens colors and appearance will vary based on lighting conditions, applied base tint color, and viewing angles. Mirror color illustrations shown above are for solid mirrors only. Flash mirrors are now shown in the illustrations above.',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },

        {
            title_div: 'Mirror Colors',
            title: 'GOLD',
            text: 'A smooth and warm shade for an affluent appearance',
            color: '#ffd700',
            note: 'Note: The lens images above are only representations of the actual color. Actual lens colors and appearance will vary based on lighting conditions, applied base tint color, and viewing angles. Mirror color illustrations shown above are for solid mirrors only. Flash mirrors are now shown in the illustrations above.',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },
        {
            title_div: 'Mirror Colors',
            title: 'GREEN',
            text: 'A radiant green filled with life and an earthy feeling ',
            color: '#008000',
            note: 'Note: The lens images above are only representations of the actual color. Actual lens colors and appearance will vary based on lighting conditions, applied base tint color, and viewing angles. Mirror color illustrations shown above are for solid mirrors only. Flash mirrors are now shown in the illustrations above.',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },

        {
            title_div: 'Mirror Colors',
            title: 'PINK',
            text: 'An infusion of crimson hues',
            color: '#ffc0cb',
            note: 'Note: The lens images above are only representations of the actual color. Actual lens colors and appearance will vary based on lighting conditions, applied base tint color, and viewing angles. Mirror color illustrations shown above are for solid mirrors only. Flash mirrors are now shown in the illustrations above.',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },

        {
            title_div: 'Mirror Colors',
            title: 'RED',
            text: 'A rich scarlet mirror for a sporty experience',
            color: '#ff0000',
            note: 'Note: The lens images above are only representations of the actual color. Actual lens colors and appearance will vary based on lighting conditions, applied base tint color, and viewing angles. Mirror color illustrations shown above are for solid mirrors only. Flash mirrors are now shown in the illustrations above.',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },

        {
            title_div: 'Mirror Colors',
            title: 'SILVER',
            text: 'A classic silver gray color for ttraditional looks',
            color: '#c0c0c0',
            note: 'Note: The lens images above are only representations of the actual color. Actual lens colors and appearance will vary based on lighting conditions, applied base tint color, and viewing angles. Mirror color illustrations shown above are for solid mirrors only. Flash mirrors are now shown in the illustrations above.',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },

        {
            title_div: 'Anti-Reflective Coating',
            title: 'AR Coating common features:',
            text: 'Maximum light transmission for enhanced visual acuity increased durability, impact resistance and scratch protection. Glare-free vision for enhanced visual comfort and reduced eye strain. Super oleophobic properties help repel oils, fingerprints and smudges. Advance hydrophobic properties prevent against moisture and water. Anti-static properties help keep away dust and dirt so the lenses stay cleaner longer. Provides better cosmetic appearance and patient satisfaction.',
            image: `${API}/upload/img1.webp`,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        }

    ]);

    await pg('superabout').insert([
        {
            title_div: 'Products and Services',
            title: 'Custom Clip-on Sunglasses',
            text: 'Best Optic Lab, Inc makes custom clip-on sunglasses for all optical frames, metal, plastic, rimless, semi-rimless. We make the clip-on with any shape to match the frame and any color to match the color of the frame. We can also make the frames multicolor, tortoise, shiny or matte. Our clips are made in the USA and are handmade by professional technicians.',
            image: `${API}/upload/img2.webp`,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },

        {
            title_div: 'Products and Services',
            title: 'Metal Frame Recoloring',
            text: 'We also recolor metal frames with any color.',
            image: `${API}/upload/img4.webp`,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },

        {
            title_div: 'Products and Services',
            title: 'Plastic Frame Finish',
            text: 'We can polish your old plastic frames or make it matte finish.',
            image: `${API}/upload/img3.webp`,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        },
    ]);

    await pg('superterms').insert([
        {
            id: 1,
            title_div: 'Terms and Conditions',
            text: '<h2 style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Welcome to Best Optic Lab, Inc</h2><p style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">These terms and conditions outline the rules and regulations for the use of Best Optic Lab, Inc"s Website.</p><br style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><p><span style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; text-transform: capitalize;">Best Optic Lab, Inc</span><span style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial; display: inline !important; float: none;"><span>&nbsp;</span>is located at:</span></p><br style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><address style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-size: medium; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">820 Thompson Ave, Ste 30 , Glendale<br>California - 91201, United States<br></address><p style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">By accessing this website we assume you accept these terms and conditions in full. Do not continue to use Best Optic Lab, Inc"s website if you do not accept all of the terms and conditions stated on this page.</p><p style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and any or all Agreements: “Client”, “You” and “Your” refers to you, the person accessing this website and accepting the Company’s terms and conditions. “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves, or either the Client or ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner, whether by formal meetings of a fixed duration, or any other means, for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services/products, in accordance with and subject to, prevailing law of United States. Any use of the above terminology or other words in the singular, plural, capitalisation and/or he/she or they, are taken as interchangeable and therefore as referring to same.</p><h2 style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Cookies</h2><p style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">We employ the use of cookies. By using Best Optic Lab, Inc"s website you consent to the use of cookies in accordance with Best Optic Lab, Inc’s privacy policy.</p><p style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Most of the modern day interactive web sites use cookies to enable us to retrieve user details for each visit. Cookies are used in some areas of our site to enable the functionality of this area and ease of use for those people visiting. Some of our affiliate / advertising partners may also use cookies.</p><h2 style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">License</h2><p style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Unless otherwise stated, Best Optic Lab, Inc and/or it’s licensors own the intellectual property rights for all material on Best Optic Lab, Inc. All intellectual property rights are reserved. You may view and/or print pages from https://bestopticlab.com/ for your own personal use subject to restrictions set in these terms and conditions.</p><p style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">You must not:</p><ol style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><li>Republish material from https://bestopticlab.com/</li><li>Sell, rent or sub-license material from https://bestopticlab.com/</li><li>Reproduce, duplicate or copy material from https://bestopticlab.com/</li></ol><p style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Redistribute content from Best Optic Lab, Inc (unless content is specifically made for redistribution).</p><h2 style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Hyperlinking to our Content</h2><ol style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><li>The following organizations may link to our Web site without prior written approval:<ol><li>Government agencies;</li><li>Search engines;</li><li>News organizations;</li><li>Online directory distributors when they list us in the directory may link to our Web site in the same manner as they hyperlink to the Web sites of other listed businesses; and</li><li>Systemwide Accredited Businesses except soliciting non-profit organizations, charity shopping malls, and charity fundraising groups which may not hyperlink to our Web site.</li></ol></li></ol><ol start="2" style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><li>These organizations may link to our home page, to publications or to other Web site information so long as the link: (a) is not in any way misleading; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and its products or services; and (c) fits within the context of the linking party"s site.</li><li>We may consider and approve in our sole discretion other link requests from the following types of organizations:<ol><li>commonly-known consumer and/or business information sources such as Chambers of Commerce, American Automobile Association, AARP and Consumers Union;</li><li>dot.com community sites;</li><li>associations or other groups representing charities, including charity giving sites,</li><li>online directory distributors;</li><li>internet portals;</li><li>accounting, law and consulting firms whose primary clients are businesses; and</li><li>educational institutions and trade associations.</li></ol></li></ol><p style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">We will approve link requests from these organizations if we determine that: (a) the link would not reflect unfavorably on us or our accredited businesses (for example, trade associations or other organizations representing inherently suspect types of business, such as work-at-home opportunities, shall not be allowed to link); (b)the organization does not have an unsatisfactory record with us; (c) the benefit to us from the visibility associated with the hyperlink outweighs the absence of<span>&nbsp;</span>; and (d) where the link is in the context of general resource information or is otherwise consistent with editorial content in a newsletter or similar product furthering the mission of the organization.</p><p style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">These organizations may link to our home page, to publications or to other Web site information so long as the link: (a) is not in any way misleading; (b) does not falsely imply sponsorship, endorsement or approval of the linking party and it products or services; and (c) fits within the context of the linking party"s site.</p><p style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">If you are among the organizations listed in paragraph 2 above and are interested in linking to our website, you must notify us by sending an e-mail to<span>&nbsp;</span><a href="mailto:info@bestopticlab.com" title="send an email to info@bestopticlab.com">info@bestopticlab.com</a>. Please include your name, your organization name, contact information (such as a phone number and/or e-mail address) as well as the URL of your site, a list of any URLs from which you intend to link to our Web site, and a list of the URL(s) on our site to which you would like to link. Allow 2-3 weeks for a response.</p><p style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Approved organizations may hyperlink to our Web site as follows:</p><ol style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><li>By use of our corporate name; or</li><li>By use of the uniform resource locator (Web address) being linked to; or</li><li>By use of any other description of our Web site or material being linked to that makes sense within the context and format of content on the linking party"s site.</li></ol><p style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">No use of Best Optic Lab, Inc’s logo or other artwork will be allowed for linking absent a trademark license agreement.</p><h2 style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Iframes</h2><p style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Without prior approval and express written permission, you may not create frames around our Web pages or use other techniques that alter in any way the visual presentation or appearance of our Web site.</p><h2 style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Reservation of Rights</h2><p style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">We reserve the right at any time and in its sole discretion to request that you remove all links or any particular link to our Web site. You agree to immediately remove all links to our Web site upon such request. We also reserve the right to amend these terms and conditions and its linking policy at any time. By continuing to link to our Web site, you agree to be bound to and abide by these linking terms and conditions.</p><h2 style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Content Liability</h2><p style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">We shall have no responsibility or liability for any content appearing on your Web site. You agree to indemnify and defend us against all claims arising out of or based upon your Website. No link(s) may appear on any page on your Web site or within any context containing content or materials that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</p><h2 style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Disclaimer</h2><p style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website (including, without limitation, any warranties implied by law in respect of satisfactory quality, fitness for purpose and/or the use of reasonable care and skill). Nothing in this disclaimer will:</p><ol style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><li>limit or exclude our or your liability for death or personal injury resulting from negligence;</li><li>limit or exclude our or your liability for fraud or fraudulent misrepresentation;</li><li>limit any of our or your liabilities in any way that is not permitted under applicable law; or</li><li>exclude any of our or your liabilities that may not be excluded under applicable law.</li></ol><p style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">The limitations and exclusions of liability set out in this Section and elsewhere in this disclaimer: (a) are subject to the preceding paragraph; and (b) govern all liabilities arising under the disclaimer or in relation to the subject matter of this disclaimer, including liabilities arising in contract, in tort (including negligence) and for breach of statutory duty.</p><p style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">To the extent that the website and the information and services on the website are provided free of charge, we will not be liable for any loss or damage of any nature.</p><h2 style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><br></h2><p style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;"><br></p><h2 style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">Credit &amp; Contact Information</h2><p style="color: rgb(0, 0, 0); font-family: &quot;Times New Roman&quot;; font-size: medium; font-style: normal; font-variant-ligatures: normal; font-variant-caps: normal; font-weight: 400; letter-spacing: normal; orphans: 2; text-align: start; text-indent: 0px; text-transform: none; white-space: normal; widows: 2; word-spacing: 0px; -webkit-text-stroke-width: 0px; text-decoration-thickness: initial; text-decoration-style: initial; text-decoration-color: initial;">This Terms and conditions page was created at<span>&nbsp;</span><a href="https://termsandconditionstemplate.com/" style="color: inherit; text-decoration: none; cursor: text;">termsandconditionstemplate.com</a><span>&nbsp;</span>generator. If you have any queries regarding any of our terms, please contact us.</p>',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
        }
    ]);

    await pg('our_address').insert([
        {
            name: 'Mr Hippo',
            company: '',
            street1: 'Broadway 1',
            street2: '',
            city: 'New York',
            state: 'NY',
            zip: '10007',
            country: 'US',
            phone: '+1 555 341 9393',
            email: 'mrhippo@goshippo.com',
            metadata: 'Hippos dont lie',
            created_at: new Date().toISOString(),
        },
    ]);


    await pg('boxparams').insert([
        {
            distance_unit:'in',
            height:2,
            length:2,
            mass_unit:'lb',
            weight:2,
            width:2,
        },
    ]);
    await pg('payment_methods').insert([
        {
            title: 'Pay with Paypal',
            icon: `${API}/upload/Paypal.png`,
            created_at: new Date().toISOString(),
        },
        {
            title: 'Pay with Credit/Debit Card',
            icon: `${API}/upload/logo-payment.png`,
            created_at: new Date().toISOString(),
        },
        {
            title: 'Pay with Google Pay',
            icon: `${API}/upload/54916a5d-8e56-4b85-813b-497f524dfb38.jpg`,
            created_at: new Date().toISOString(),
        }
    ]);


    await pg('ship_methods').insert([
        {
            title: 'Ship in Fedex',
            icon: `${API}/upload/eb8aa71b-3b57-4118-905f-521fdd124317.png`,
            created_at: new Date().toISOString(),
        },
        {
            title: 'Ship in UPS',
            icon: `${API}/upload/23c49151-a4aa-48c1-abbf-d79fa72c7142.png`,
            created_at: new Date().toISOString(),
        },
        {
            title: 'Ship in USPS',
            icon: `${API}/upload/6aeec8c2-9311-4be5-a088-5930819f9d46.png`,
            created_at: new Date().toISOString(),
        }
    ]);
    
    await pg('company_settings').insert([
        {
            logo:  `${API}/upload/7d0c6fdd-87b0-4209-8a02-ebcc2f7b437f.png`,
            phone: '818-649-1799',
            director: 'Mr director',  // change
            company_name: 'Best Optic Lab',
            company_address: '820 Thompson Ave, Ste 30 Glendale, CA 91201',
            created_at: new Date().toISOString(),
        },
    ])
    await pg('employes').insert([
        {
            email:TASKS.TASKS_LOGIN,
            password: bCrypt.hashSync(TASKS.TASKS_PWD, bCrypt.genSaltSync(10), null),
            role:"tasks_admin",
            created_at: new Date().toISOString(),
        },
    ]);
}

async function init() {
    try {
        const options = process.env.NODE_ENV === 'production'
            ? knexConfigs.production
            : knexConfigs.development;
        const pg = knex(options);
        await seed(pg);
        console.log('Successfully inserted all data ... ');
        process.kill(process.pid);
    } catch (error) {
        console.error(error.message);
    }
}

init();
