# Metrics

The North Star metric is **qualified audits completed per week**. Spendlens is not a daily-use social app; it is a high-intent B2B utility that someone uses when AI spend becomes painful or renewal decisions are coming up. A completed audit means the user had enough intent to enter real spend data and receive a result. A qualified audit means the result contains meaningful savings, high AI spend, or a Credex credit opportunity.

Three input metrics drive the North Star:

1. **Audit start rate** - percentage of landing page visitors who begin the audit form. This shows whether the landing page pain and CTA are clear.
2. **Audit completion rate** - percentage of starts that reach the results page. This shows whether the form is too long, confusing, or fragile.
3. **High-savings lead capture rate** - percentage of users with material savings who submit email/company details after seeing value. This is the bridge from free tool to Credex pipeline.

The first instrumentation I would add:

- Landing page view
- CTA click
- Audit step completed
- Audit generated
- Monthly savings bucket
- Credex CTA shown
- Lead submitted
- Shareable report created
- Report link opened

I would not use DAU as a primary metric because most startups audit spend occasionally, not every day. Better metrics are completion, qualified savings, and consultation intent.

A pivot decision would trigger if 500 targeted visitors produce fewer than 50 audit starts or fewer than 10 completed audits. That would suggest the pain is not clear enough, the audience is wrong, or the landing page does not communicate value. If audits are completed but lead capture is below 5% for high-savings users, the result page or Credex offer needs work.
