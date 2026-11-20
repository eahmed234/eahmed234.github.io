# Open questions for the verifier

Points the ledger, rewrite and verify sessions could not settle and left for the user's own reading. They
are collected here so they are in front of you when you verify a note: `python3 audit.py --sheet "<note>"`
prints that note's questions at the top of its sheet, and `python3 audit.py --questions` lists every note
that has any.

- One `## <note name>` section per note (the file name without `.md`); `## General` for questions that
  recur across notes.
- An open question is `- [ ]`. When you rule, change it to `- [x]` and write the ruling after `→` — by
  hand, or with `python3 review_questions.py`, a local page that shows each question with its ledger entries
  and source page and writes the ruling here for you. A ruling
  that will recur (a name, a phrase, a tagging rule) is also recorded in `ledger/GLOSSARY.md`.
- Until a question is answered, the note follows the cautious reading stated under "now:".

## General

- [ ] **«أبو عمرو» beside Ibn Ḥazm / Ibn Hishām** (*Subul* 4:15, 4:17; «أبو عمر» at 4:176). Misprint for Abū ʿUmar?
  now: written "Abū ʿAmr", as printed. →
- [ ] **Hijrī-year tags.** When a page gives only "N months from his hijrah" and no year, may a note carry a year tag (`2-ah`) as arithmetic, like the Gregorian exemption?
  now: existing tags kept, none added. →

## Maʾsāt Biʾr Maʿūnah

- [ ] **Location of Biʾr Maʿūnah** (S6.66.01 vs M677.03 editor's note). *Subul*: «موضع في بلاد هذيل بين مكة وعسفان»; Muslim's editor: «في أرض بني سليم، فيما بين مكة والمدينة». Two books differ.
  now: the note gives both, as a dispute. →
- [ ] **Qunūt before or after the bowing** (M677.07 «قبل الركوع» vs M677.04–06 «بعد الركوع»), both from Anas in Muslim.
  now: the note reports both. →
- [ ] **S6.58.19–20, S6.59.07–08** — who the subject is of «فاتبعوا أثره حتى وجدوا القوم», and who «الآخر» is in the dialogue; the page does not say.
  now: the note names no speaker and omits the track-following clause. →

## Ghazwat Dhī Amr

- [ ] **S4.176.09** «قال: قال لن يلاقوك…» — the speaker is not named; Jabbār (just brought in) or someone else?
  now: the note gives the words to Jabbār, as the context suggests. →
- [ ] **S4.176.06** «فأصابوا بالمدينة رجلا منهم بذي القصة» — «بالمدينة» does not fit Dhū al-Qiṣṣah; misprint?
  now: not rendered; the man is placed at Dhū al-Qiṣṣah. →

## Dustūr al-Madīnah

- [ ] **S3.384.07 — «فهؤلاء لم يثبت أحد منهم»** (Ibn Ḥajar, on the leaders listed). "Not one of them held firm" — in belief, or in what? Not spelled out.
  now: the clause is omitted; the note gives only «فيحتمل أن يكونوا المراد». →
- [ ] **S3.384.01 — «المعنى: …»** opens 3:384 without saying whose gloss it is (al-Ṣāliḥī's or Ibn Ḥajar's).
  now: not used in the note. →
- [ ] **S3.383.07 — the ḥadīth of the ten, «والشيخان».** al-Ṣāliḥī gives it to Aḥmad and the two Shaykhs; the editors' takhrīj (3:383 n. 1) names only Aḥmad and Ibn ʿAdī; not looked for in K/M.
  now: no collector is named in the text. →
- [ ] **S3.384.09 — who calls al-Suhaylī's statement «أغرب».** Ibn Ḥajar's word or al-Ṣāliḥī's (Ibn Ḥajar's «قال الحافظ: كذا قال» follows).
  now: "this is described as a strange statement", unattributed. →

## Ghazwat Safawān

- [ ] **S4.16.02 — where Ibn Ḥazm's words end.** «وقال ابن حزم: بعدها بعشرة أيام خرج رسول الله ﷺ في ربيع الأول على رأس ثلاثة عشر شهرا … من مهاجره». Either all of it is Ibn Ḥazm's, or his words end at «بعشرة أيام» and the date is al-Ṣāliḥī's own narrative (Rabīʿ al-Awwal at thirteen months cannot follow al-ʿUshayrah, which 4:17 puts in Jumādā at sixteen months).
  now: the note and `date_hijri` credit the date to Ibn Ḥazm. →
- [ ] **S4.16.02 — the ellipsis** printed between «ثلاثة عشر شهرا» and «من مهاجره»: the page does not say what is omitted.
  now: read as "thirteen months from the hijrah". →

## Ghazwat Buwāṭ

- [ ] **S4.15.01, S4.15.04 — «أبو عمرو».** See General.
  now: "Abū ʿAmr". →
- [ ] **Tag `2-ah`.** The page gives "thirteen months from his hijrah" and no year. See General.
  now: tag kept. →

## Ghazwat al-ʿUshayrah

- [ ] **S4.17.04–.12 — where the Ibn Isḥāq / Ibn Ḥazm quotation ends.** «وقال ابن إسحاق وابن حزم وغيرهما: في جمادى الأولى، وحمل لواءه … واستخلف … وخرج في مائة وخمسين، ويقال في مائتين». The sentence runs on from the date into the banner, deputy and numbers; either all is theirs or only the date.
  now: the date is credited to them by name; banner, deputy and numbers are written as plain narrative. →
- [ ] **S4.17.13–.16 — where Abū ʿAmr's words end.** «قال أبو عمرو: أخذ … على طريق ملل إلى العشيرة، فأقام … ووادع … ثم رجع إلى المدينة ولم يلق كيدا، قالوا: …». Is the whole route/stay/truce/return his, or only the first clause? (See General on «أبو عمرو».)
  now: written as plain narrative, no attribution in the text. →
- [ ] **S4.17.17 — «قالوا».** Who "they" are is not stated.
  now: "It is said that…". →

## Ghazwat al-Suwayq

- [ ] **S4.174.06 — «فبعث رجلًا من قريش فأتوا…».** Singular «رجلًا» with plural verbs after it.
  now: rendered "men". →
- [ ] **S4.174.09 — «وقيل: إن أبا سفيان فعل ذلك».** What «ذلك» refers to (most likely the raid on al-ʿUrayḍ).
  now: the note gives the report in the source's words without interpreting it. →
- [ ] **Tag `2-ah`.** The page gives «على رأس اثنين وعشرين شهرا» without saying from what, and no year. See General.
  now: tag kept. →

## Ghazwat al-Abwāʾ

- [ ] **S4.14.07 — «قال ابن إسحاق وابن سعد وأبو عمرو: جمع محشي بن عمرو الضمري».** The verb «جمع» has no evident sense here; the sentence reads as a disagreement over who concluded the treaty, but does not say so.
  now: the note says they "name Makhshī in this connection" and Ibn al-Kalbī gives ʿUmārah; no verb is rendered. →
- [ ] **S4.14.02–.03, .09 — where Abū ʿAmr's / the Ibn Isḥāq group's words end.** The print marks no end to «قال أبو عمرو: …» (does it cover the banner and departure?) nor to the quotation before «ووادعهم على ألا يغزوا…».
  now: Abū ʿAmr is named only for the stay in Madīnah; departure and treaty terms are plain narrative. →
- [ ] **S4.14.04 — «أبو سعد وأبو عمر».** Abū ʿUmar here, Abū ʿAmr elsewhere. (See General on «أبو عمرو».)
  now: as printed. →

## Kurz b. Jābir al-Fihrī

- [ ] **I5.435.01–02 — whose words are «ثمانية فأسلموا … وفيه: …».** They follow al-Wāqidī's «قدم نفر من عرينة» (5:434), but the page does not say whether al-Wāqidī's words run to the end or Ibn Ḥajar resumes.
  now: given as the report from Yazīd b. Rūmān (via al-Wāqidī), as printed. →
- [ ] **I5.435.05 vs .07 — Ḥubaysh b. Khālid / Ḥubaysh b. al-Ashʿar.** Ibn Ḥajar writes «هو وحبيش بن خالد» and then «وكذا وقع عند البخاري … حبيش بن الأشعر الخزاعي»; the page does not say whether one man or two.
  now: both names given as printed; the note links the first to Ḥubaysh b. Khālid and does not identify the two. →

## Sariyyat al-ʿUraniyyīn

- [ ] **S6.120.01 — «يريد أنهم كحلوا بأميال قد أحميت…».** The sentence opens 6:120 with no named subject; it follows al-Khaṭṭābī's «وقد يكون من المسمار» (end of 6:119). Either al-Khaṭṭābī is explaining *samr* as from *mismār*, or al-Ṣāliḥī / another author is explaining the whole report.
  now: given unattributed ("it is explained that…"). →
- [ ] **S6.116.12 / .14 — «قال أنس كما عند ابن عمر».** Printed "Ibn ʿUmar" (for Muḥammad b. ʿUmar?). See the ledger's `unsettled`.
  now: Anas's words are not attributed to either source in the note. →

## Wafd Bahrāʾ

- [ ] **S6.284.08, .14 — «أبو معبد».** The page never says Abū Maʿbad is al-Miqdād's kunyah; the guests say «يا أبا معبد» and the Prophet ﷺ asks «ما فعل ضيف أبي معبد؟» (answered «عندنا»).
  now: name as printed; the note does not identify it with al-Miqdād. →
- [ ] **S6.284.07, .11 — «مولاتي».** Printed with no gloss: Sidrah as Ḍubāʿah's *mawlāh* (freedwoman), or her mistress?
  now: "Ḍubāʿah's *mawlāh* Sidrah". →
- [ ] **S6.284.13 — «فرددها عليهم».** Subject not stated (al-Miqdād or the household).
  now: "whenever it was set before them again", no subject. →

## Umayyah b. Khalaf

- [ ] **S4.47.10 — where the report ends.** «وكان هو الذي يعذب بلالا بمكة حتى يترك الإسلام». Either ʿAbd al-Raḥmān's own words or an aside by Ibn Isḥāq/al-Ṣāliḥī; the page does not mark it.
  now: the note says "the text adds that he was the one who used to torture Bilāl", unattributed. →

## ʿUmrat al-Qaḍāʾ

- [ ] **S5.189.13 — «ويقال: عويف بن الأضبط».** Printed straight after al-Balādhurī's «استعمل أبا ذر»; whose words are they (al-Balādhurī's, or al-Ṣāliḥī's, since ʿUwayf is already Ibn Hishām's)?
  now: "The page then has: …", no speaker named. →
- [ ] **S5.191.10 — «الرابع من ذي الحجة».** Printed Dhū al-Ḥijjah though the chapter opens in Dhū al-Qaʿdah; misprint?
  now: "as the page prints it". →
- [ ] **S5.195.14 — «وكان عدة المسلمين … ألفين».** Ibn Isḥāq's words or al-Ṣāliḥī's? 
  now: stated unattributed after Ibn Isḥāq's sentence. →
- [ ] **S5.195.16 — «يعني خيبر».** Whose gloss: Ibn Hishām's, Abū ʿUbaydah's or al-Ṣāliḥī's?
  now: "glossed there as Khaybar". →

## Bināʾ al-Masjid al-Nabawī

- [ ] **S3.343.02 — «فقال [موسى بن عقبة: هما ابنا رافع بن عمرو بن أبي عمرو]».** Mūsā b. ʿUqbah's name and words stand in square brackets in the printed matn: al-Ṣāliḥī's own text, or an editorial insertion by the muḥaqqiqūn?
  now: attributed to Mūsā b. ʿUqbah, cited as 3:343 matn. →
- [ ] **S3.336.14 — «فمر بعثمان فقال: يا بن سمية، ما أعرفني بمن تعرض، ومعه جريدة، فقال: لتكفن أو لأعترضن بها وجهك».** Who passes, who speaks and who holds the palm-rib is not marked (ʿAmmār / ʿUthmān b. Maẓʿūn).
  now: the words given without naming speakers; only "ʿAmmār … passed ʿUthmān" stated. →
- [ ] **S3.338.04 — «ثم بالسعيد لبنة ونصف أخرى»** against the gloss at 3:346 «السعد ثلث اللبنة والسعيد ربعها».
  now: as printed ("a brick and a half of another"), the gloss not used. →
- [ ] **S3.337.04–06 — Abū Yaʿlā's chain.** «إلا أن التابعي لم يسمع عن عائشة»: the *tābiʿī* is unnamed.
  now: stated as the page states it. →

## al-Muʾākhāh

- [ ] **S3.368.14–15 — «زاد شعبة بن التوأم: «ولكن تمسكوا بحلف الجاهلية» . انتهى. «وأيما- وفي لفظ: كل- حلف … وما يسرني أن لي حمر النعم وأني نقضت الحلف الذي كان في دار الندوة»».** After «انتهى» a new quotation opens; the speaker of «وما يسرني…» (the Prophet ﷺ, or a transmitter) and whether it belongs to Shuʿbah's wording is not marked. Readings: (a) the Prophet's ﷺ words; (b) a narrator's.
  now: given as "the passage goes on", speaker unnamed. →
- [ ] **S3.363.09 — Ibn ʿUmar's report (ʿAlī left weeping).** Printed after the first fraternity's list and before the second, with no mark of which fraternity it belongs to.
  now: placed under "before the Hijrah" as the page's order has it, with no date stated for it. →
- [ ] **S3.365.15–16 — «المنذر بن عمر» (with «المعنق ليموت») / «المنذر بن عمرو».** Name printed two ways; «المعنق ليموت» unglossed.
  now: the pair given only in the disputes section, as ʿAmr; «المعنق ليموت» left out. →
- [ ] **S3.363 / S3.364.08 — «ضمرة بن سعيد» / «حمزة بن سعيد».** The same authority printed two ways.
  now: Ḥamzah b. Saʿīd, as 3:364 prints it. →
- [ ] **S3.369.10 — «وبذلك يجتمع الحديثان…»** is in the editors' square brackets inside the matn.
  now: not used as a claim. →

## Sariyyat Ḥamzah b. ʿAbd al-Muṭṭalib ilā Sayf al-Baḥr

- [ ] **S6.11.15 — «فيما ذكره محمد بن عمر عن مجدي أيضا: «[إنه- ما] علمت- ميمون النقيبة مبارك الأمر» أو قال: «رشيد الأمر»».** Does the saying come from Muḥammad b. ʿUmar, or only the report about Majdī? Is «عن مجدي» "from" or "about" Majdī? Is «ميمون» a misprint for «مأمون» (the form glossed at 6:12)?
  now: attributed to Muḥammad b. ʿUmar as cited; the 6:12 gloss is not attached to the printed word; the editors' bracketed words are left out of the quotation. →
- [ ] **S6.11.01 vs S6.11.02** — the heading says thirty men "of the Muhājirūn and the Anṣār"; Ibn Saʿd says all Muhājirūn.
  now: both given. →

## Sariyyat ʿUbaydah b. al-Ḥārith ilā Baṭn Rābigh

- [ ] **S6.13.03 — «فخرج فلقي أبا سفيان بن حرب، في أناس من أصحابه على ماء…»** Do «أناس من أصحابه» accompany ʿUbaydah (subject of «فخرج») or Abū Sufyān?
  now: the companions are left out of the note. →
- [ ] **S6.13.03 — «[على عشرة أميال من الجحفة وأنت تريد قديدا على يسار الطريق، وإنما]»** is in the editors' square brackets inside the matn.
  now: the ten miles from al-Juḥfah is stated with a footnote saying it is the editors' insertion; the Qudayd road is left out. →
- [ ] **S6.13.06 — «قال محمد بن عمر: … وهو الثبت عندنا»** Where Muḥammad b. ʿUmar's words end is not marked.
  now: only "the sound view with him" is attributed to him. →

## Sariyyat Saʿd b. Abī Waqqāṣ ilā al-Kharrār

- [ ] **Title.** The page prints «الخزاز» (vowelled «الخزّاز», glossed «بفتح الخاء المعجمة وتشديد الزاي الأولى»), i.e. al-Khazzār; the note's file name and title say al-Kharrār.
  now: the body writes al-Khazzār as printed; the title is left. →
- [ ] **S6.15.08 — «حتى صبحوا صبح خمس الخزاز من الجحفة»** Is «صبح خمس» "the morning of the fifth (night/day)" or "five (nights)' morning"? The unit is not stated.
  now: "at the morning of five", no unit. →
- [ ] **S6.15.06 — «يعترض عيرا لقريش تمر بهم»** Who is the subject of «يعترض»: Saʿd, or the party?
  now: "intercepting a caravan of Quraysh passing them", no subject. →
- [ ] **S6.15.11 — «هذه السرايا جميعها»** The sarāyā are not listed on this page; is this one among them?
  now: stated as "these sarāyā", without saying this sarīyah is one. →

## Sariyyat ʿAbdillāh b. Jaḥsh ilā Baṭn Nakhlah

- [ ] **S6.16.05 — «فوافيت الصبح وعلي قوسي وسيفي»** (6:16). The narrator of the first-person account is not named on the page; the chapter's subject is ʿAbdullāh b. Jaḥsh, to whom the letter is given.
  now: the note says "ʿAbdullāh", as the chapter's subject. →
- [ ] **S6.16.10 / S6.17.22 — «واقد بن عبد الله الليثي»** (6:16) against «واقد بن عبد الله [التميمي]» (6:17; al-Tamīmī also at *al-Iṣābah* 6:465). Misprint, or two descriptions?
  now: the roster gives the name without a nisbah; the shooter is "al-Tamīmī" (6:17 and *al-Iṣābah*). →
- [ ] **S6.18.06 — «زر [بن جيش]»** (6:18) against «زر [بن حبيش]» (6:17). Misprint for Ḥubaysh?
  now: the note writes Zirr b. Ḥubaysh. →
- [ ] **S6.18.12 — «فقال: «من يرد عليهم من المسلمين ممن كان بمكة، إنما أصابوا ما أصابوا في شعبان»؟»** The speaker is not named, and the clause gives the date as Shaʿbān.
  now: the sentence is not used in the note. →
- [ ] **S6.17.17 — «قوم عمار»** (6:17; vowelled «عمار» at 6:20, unglossed). What does the word mean?
  now: left untranslated: "a people of ʿUmmār". →
- [ ] **I2.95.03 — «وقال: أنا الذي أسرت الحكم … ببئر معونة»** (*al-Iṣābah* 2:95). Where do Miqdād's words end and the author's narrative resume?
  now: only the martyrdom at Biʾr Maʿūnah is used, and it rests also on *Subul* 6:19. →

## Ghazwat Banī Qaynuqāʿ

- [ ] **S4.179.10 — «[قريظة والنضير وبني قينقاع]»** (*Subul* 4:179). On the page the three names stand in square brackets inside the opening passage (the ledger snippet omits the brackets). Whose insertion is it: al-Ṣāliḥī's, the editors', or the quoted source's?
  now: the three names are stated as the three Jewish groups, as printed in the matn. →
- [ ] **S4.181.12 — «أعرب الحاكم»** (perhaps «أغرب»). Printed «أعرب».
  now: "Al-Ḥākim stated", as printed. →
- [ ] **S4.181.13 — «ولم يوافق على ذلك»** (after al-Ḥākim's statement that the two expulsions were at one time). Subject not named: the Ṣāliḥī or the authority he quotes.
  now: "this was not agreed to", no subject named. →
- [ ] **S4.180.41 — «فخرجوا بعد ثلاث».** No noun: days or nights not stated.
  now: "after three", as printed. →
- [ ] **S4.180.50 — «وأخرى فضة».** Does «فضة» name the second coat of mail or describe it?
  now: "another of *fiḍḍah*", untranslated. →

## Taḥwīl al-Qiblah

- [ ] **S3.373.03 — «لفق من شهر القدوم وشهر التحويل وشهرا»** (al-Ḥāfiẓ). "…and a month" — a single month, or a misprint meaning the months between?
  now: "the month of arrival, the month of the turning and a month", as printed. →
- [ ] **S3.373.09 — «ولا يستقيم أن يكون ذلك في شعبان إلا بإلغاء شهري القدوم والتحويل».** Speaker not named: al-Ṣāliḥī, or al-Ḥāfiẓ continuing?
  now: stated unattributed, footnoted to 3:373. →
- [ ] **S3.373.01 — opens mid-sentence** («وقال ابن عباس» ends 3:372). Is "Ibn Jarīr" in the list a source for sixteen months, or a bare name?
  now: "Ibn ʿAbbās also, with al-Zuhrī, Saʿīd b. al-Musayyab, Qatādah and others, gave sixteen". →
- [ ] **S3.371.20 — «ستة أو سبعة عشر شهرا»** printed "six or seventeen" for «ستة عشر».
  now: not used; the note cites K 399 and K 4486 for "sixteen or seventeen". →
- [ ] **S3.373.18 — «والأول أصح … وقد صححه الحاكم».** Which view is "the first", and what does «صححه» refer to (the first view, or the ḥadīth)?
  now: "the first of the two views … al-Ḥākim and others have declared it sound". →

## Ghazwat Banī Sulaym

- [ ] **S4.172.02 — «قال ابن إسحاق، وأبو عمر، وابن حزم، وغيرهم: بلغه …»** opens the narrative with no marked end to the attribution; the author's own narrative may resume anywhere before the *tanbīhāt*.
  now: the narrative is stated as fact and footnoted to 4:172, as printed. →
- [ ] **S4.172.09 — «واستقبلهم رسول الله … في بطن الوادي».** Who are «هم»: the party sent along the upper valley, or the people of Sulaym?
  now: "met them", as printed. →
- [ ] **S4.172.38 / S4.172.42 — Ibn Isḥāq «في شوال سنة اثنتين» and «في شهر المحرم سنة ثلاث».** The page does not name the expedition for either date.
  now: given as Ibn Isḥāq's dates, expedition not named. →
- [ ] **S4.172.43 — Ibn Saʿd's Banī Sulaym at twenty-seven months** (6 Jumādā al-Ūlā) beside Qarqarat al-Kudr at twenty-three months (S4.172.37). Same expedition or two?
  now: both reported, no identification. →
- [ ] **S4.172.30 — «فرق في العيون بين هذه الغزوة وغزوة قرقرة الكدر».** The lead treats Banī Sulaym at al-Kudr and Qarqarat al-Kudr as one (S4.172.01); ʿUyūn separates them.
  now: both stated as printed. →
- [ ] **S4.172.39 / S4.172.41 — Ibn Saʿd's Ghaṭafān expedition on the 12th and (apparently) the 18th of Rabīʿ al-Awwal.**
  now: not used in the note. →
- See General (month-counts and the `2-ah` tag).

## Sariyyat al-Rajīʿ
- [ ] **S6.40.01 — whose words are S6.40.01–12?** The page opens «قال نقلا عن شيوخه:» with no named speaker; where the quotation ends and the author resumes is not fixed.
  now: stated as the narrative, without naming a transmitter.  →
- [ ] **S6.45.02 — «وصوابه أبو ميسرة كما عند ابن إسحاق».** Is the correction Abū ʿUmar's, al-Ṣāliḥī's or Ibn Ḥajar's?
  now: "the correct name is given as Abū Maysarah", no author named.  →
- [ ] **S6.42.15 — «كان ابن أخته لا ابن أخيه عقبة بن الحارث…».** Elliptical: whose sister's son (Ḥujayr's?), and is ʿUqbah the buyer or the one for whom he was bought?
  now: Ibn Hishām's words given as printed.  →
- [ ] **S6.43.14 vs S6.53.07.** The Ḥāfiẓ says the boy who crept to Khubayb is other than the one who brought the iron; the gharīb says the one who crept is Abū Ḥusayn, who (S6.43.06) brought the iron.
  now: both stated, the Ḥāfiẓ's reconciliation attributed to Ibn Ḥajar; the gharīb not used.  →
- [ ] **S6.45.10 — «وروى الإمام أحمد بن عمرو بن أمية».** Misprint for «أحمد عن عمرو بن أمية»?
  now: "Imām Aḥmad (from ʿAmr b. Umayyah)".  →
- [ ] **S6.41.12–15 vs S6.41.16–17.** How the three came down, and where ʿAbdullāh b. Ṭāriq was killed (Ṣaḥīḥ: after refusing; Ibn Isḥāq: at al-Ẓahrān); the author does not reconcile.
  now: both told, as two accounts.  →

## Ghazwat Badr al-Mawʿid

- [ ] **Where Ṣafwān's speech ends** (S4.338.17–19). «وأخذوا في الكيد والنفقة … ولم يقبل من أحد منهم أقل من أوقية لغزو الخندق» — still Ṣafwān's words, or the author's narrative?
  now: written as narrative of what Quraysh did, not as Ṣafwān's speech. →
- [ ] **Maʿbad's count** (S4.338.15 «وأنهم ألفان» vs S4.337.19 «ألف وخمسمائة»). Misprint or a different count?
  now: both given, the two thousand as Maʿbad's report. →
