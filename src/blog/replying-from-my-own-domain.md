---
title: "Replying from my own domain"
description: "A reader's question about agent verification led to two email failures that made the same lesson concrete: check the layer that supports the claim."
date: 2026-10-05T12:00:00-04:00
tags: [ai, workflow, testing, email]
layout: post.njk
thumbnail: /images/blog/replying-from-my-own-domain-unsplash.jpg
---

![A white envelope tied with ribbon beside a pencil on a wooden desk](/images/blog/replying-from-my-own-domain-unsplash.jpg)

Photo by [Joanna Kosinska](https://unsplash.com/@joannakosinska) on [Unsplash](https://unsplash.com/photos/white-envelop-and-gray-pencil-on-white-panel-LbMy35NyCNg).

A reader emailed after [Making my AI workflow keep its receipts](https://levihuff.net/blog/making-my-ai-workflow-keep-its-receipts/). They picked out two details: a site audit that produced 17 commits without merge conflicts, and a date that looked wrong in the browser even though the tests passed. Their question was where my attention belongs when agents handle the work.

I normally give the agents the objective and let them work out the implementation and verification. My attention goes to whether they are solving the right problem and whether the evidence supports the result. If the premise is wrong, that is still my responsibility.

Replying gave me another example. The conversation was already in Gmail, but I wanted the reply to come from `contact@levihuff.net`. Getting that working exposed a gap between receiving mail, authenticating to an SMTP server, and being allowed to send from a particular address.

## Where my attention belongs

The lead agent coordinates the work. I do not assign every file or supervise every check. A failing test can be something the agents diagnose and fix themselves. My part is to supply the intended outcome, question the assumptions, and resolve decisions that still need my judgment.

In my Claude-led setup, Claude plans, implements, and integrates. Codex reviews or diagnoses on demand; Gemini handles large-context investigations; Qwen takes small, single-step helper tasks. I do not run every model on every task.

My Codex-native arrangement is separate: Sol owns requirements, planning, integration, and the completion audit; Terra handles architecture, difficult diagnosis, and review; Luna takes bounded execution and investigation. Those are roles within Codex, not three different providers.

The July audit was another specific arrangement: four Sonnet agents worked in separate worktrees with disjoint file ownership, while Opus planned and coordinated. Integration and verification stayed with the root session. The audit record reports 17 non-merge commits, zero merge conflicts, and 124 of 124 tests passing in the individual worktrees and on the integration branch. That is evidence for careful ownership and verification, not proof supplied by agent agreement.

Changing models does not necessarily create a separate context, either. In [my earlier three-provider workflow](/blog/rebuilding-my-dev-setup-with-three-llms/), Opus planning and Sonnet execution shared one Claude session. A model change, a separate reviewer, and an isolated worktree are different boundaries. None guarantees independent errors.

I had already learned that through an Apache-header change. Improving a directive was irrelevant because the host did not serve the file. More scrutiny of the directive could not fix the premise. The date example showed a different gap: tests accepted a valid date, while browser review revealed that it displayed the previous day in Eastern time. Each check answered a narrower question than whether the whole result was right.

## Receiving at my domain was only half the setup

The original route was straightforward:

```text
contact@levihuff.net
  -> Porkbun Email Forwarding
  -> my personal Gmail inbox
```

That was enough for the reader's message to reach me. It did not provide an authenticated outbound SMTP service for sending as my domain address. [Porkbun's forwarding documentation](https://kb.porkbun.com/article/10-how-to-set-up-email-forwarding-service) makes that distinction: forwarding delivers to an existing inbox; sending from the domain requires mail hosting.

I already pay for iCloud+, so I used its Custom Email Domain feature instead of buying separate hosted email from Porkbun. The domain was partly configured in iCloud, but the mail-routing cutover was unfinished.

Porkbun remained the domain and DNS provider. Mail handling moved to iCloud. Porkbun forwarding was removed because its routing conflicted with the iCloud MX configuration. Re-enabling it would mean revisiting that routing decision, not restoring a harmless extra forwarding rule.

Gmail still held the existing conversation. The goal was to use it as the reply interface, with iCloud supplying outbound mail. New incoming domain mail now went to iCloud; this did not establish a new route into Gmail.

## A recipient failure, then a sender failure

The first failure was inbound. The delivery notification showed:

```text
550 5.1.1 : user does not exist
```

My setup record describes routing that appeared to reach iCloud, where the recipient was rejected. That was a clue to check whether the address existed there, not just whether the domain had mail records.

The catch-all option was initially disabled. Enabling **Allow All Incoming Messages** reportedly improved incoming behavior, and a Gmail verification message subsequently arrived in iCloud Mail. That was concrete evidence of inbound delivery at that point. It still did not establish that `contact@levihuff.net` had been explicitly registered as an address I could send from.

[Apple documents catch-all mail](https://support.apple.com/guide/icloud/mm9e3ee0680f/icloud) as accepting messages for addresses that have not been created. It is optional. The decisive final configuration was explicitly adding `contact@levihuff.net` to the custom domain's email-address list, which Apple manages separately through [Manage Email Addresses](https://support.apple.com/guide/iphone/iph4de56a8a2/ios).

<div class="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
  <figure>
    <a href="/images/blog/domain-email/inbound-address-not-found.jpg" aria-label="Open full-size screenshot: Gmail delivery failure showing 550 5.1.1: user does not exist">
      <img src="/images/blog/domain-email/inbound-address-not-found.jpg" alt="Gmail delivery failure showing 550 5.1.1: user does not exist" width="590" height="1280" loading="lazy" style="width:100%;height:auto;">
    </a>
    <figcaption class="text-sm text-fg-2 mt-3">The initial inbound rejection. The address could not receive this message.</figcaption>
  </figure>
  <figure>
    <a href="/images/blog/domain-email/gmail-verification-redacted.png" aria-label="Open full-size screenshot: Gmail verification email addressed to contact@levihuff.net with private details blacked out">
      <img src="/images/blog/domain-email/gmail-verification-redacted.png" alt="Gmail verification email addressed to contact@levihuff.net with private details blacked out" width="590" height="1280" loading="lazy" style="width:100%;height:auto;">
    </a>
    <figcaption class="text-sm text-fg-2 mt-3">The verification email subsequently arrived in iCloud Mail. My private account address and the confirmation link are covered with solid black redactions.</figcaption>
  </figure>
</div>

Meanwhile, Gmail Send-As had its own checks. The setup used Gmail's desktop web interface in Safari, under **Settings → See all settings → Accounts and Import → Send mail as**. The identity was Levi Huff at `contact@levihuff.net`, with **Treat as an alias** enabled.

The outgoing connection used:

| Setting | Value used |
| --- | --- |
| SMTP server | `smtp.mail.me.com` |
| Port | `587` |
| Security | TLS / STARTTLS |
| Authentication | Required |
| Username | My primary iCloud Mail address |
| Password | An Apple app-specific password |

My Apple Account sign-in used a Gmail address. That was not the SMTP username. The working identity was the full primary `@icloud.com` Mail address. [Apple's SMTP settings](https://support.apple.com/en-us/102525) specify a full iCloud Mail address and an [app-specific password](https://support.apple.com/en-us/102654).

Gmail located the server, accepted the credentials, sent its verification message, and eventually displayed a confirmation-success page. The next attempt to send still failed:

```text
550 5.7.0 From address is not one of your addresses
```

The diagnosis in that setup record was that Gmail could authenticate to Apple's SMTP service, but iCloud did not yet recognize `contact@levihuff.net` as an authorized outgoing address for that account. Explicitly adding the address in iCloud resolved the remaining problem.

Authentication answered whether the SMTP credentials were accepted. Authorization answered whether that account could use this particular From address. The successful login had not proved both.

<div class="grid grid-cols-1 sm:grid-cols-2 gap-6 my-8">
  <figure>
    <a href="/images/blog/domain-email/outbound-from-rejected.jpg" aria-label="Open full-size screenshot: Gmail delivery failure showing 550 5.7.0 From address is not one of your addresses">
      <img src="/images/blog/domain-email/outbound-from-rejected.jpg" alt="Gmail delivery failure showing 550 5.7.0 From address is not one of your addresses" width="590" height="1280" loading="lazy" style="width:100%;height:auto;">
    </a>
    <figcaption class="text-sm text-fg-2 mt-3">Gmail verification had completed, but iCloud still rejected the requested From address.</figcaption>
  </figure>
  <figure>
    <a href="/images/blog/domain-email/gmail-send-as-redacted.png" aria-label="Open full-size screenshot: Gmail Send-As settings showing contact@levihuff.net through smtp.mail.me.com on port 587 with TLS">
      <img src="/images/blog/domain-email/gmail-send-as-redacted.png" alt="Gmail Send-As settings showing contact@levihuff.net through smtp.mail.me.com on port 587 with TLS" width="590" height="1280" loading="lazy" style="width:100%;height:auto;">
    </a>
    <figcaption class="text-sm text-fg-2 mt-3">The completed Gmail configuration. The private account address and avatar are covered with solid black redactions. This screen records settings, not final delivery.</figcaption>
  </figure>
</div>

## What the completed checks established

The completed setup record confirms that sending from `contact@levihuff.net` worked, the reply stayed in the existing Gmail conversation, and delivery was confirmed. Gmail's Send-As verification was complete, and the domain address had been selected as the default sending identity. Making it default was a choice for this setup; Gmail also supports selecting the From address for an individual message.

The evidence has useful boundaries:

| Evidence | What it established |
| --- | --- |
| Gmail verification message received in iCloud Mail | Incoming delivery to the domain address worked at that point. |
| Gmail confirmation-success screen | Gmail's address-verification step had completed. |
| Subsequent SMTP From-address rejection | The confirmation screen had not established authorization to send that message through iCloud. |
| Completed session record confirming send and delivery | The intended reply succeeded after the address was registered. |

The final outcome comes from that completed session record. The setup screenshots show intermediate confirmations and failures; they do not establish SPF, DKIM, or DMARC alignment, inbox placement, or what every recipient header contained. I have no recipient-header inspection to add to that claim.

There is also a time limit on treating this as a reusable recipe. As of this draft, [Google's Send-As documentation](https://support.google.com/mail/answer/22370?hl=en) says support for third-party email addresses will end in January 2027. This records the setup that worked for this reply.

The reader's question was about where I put my attention. The email setup made my answer more concrete: check what a successful result actually proves. A valid date can display the wrong day. Reviewers can agree about a file the host never uses. An SMTP server can accept credentials and reject the From address.

I want agents to handle implementation, diagnosis, and verification. My responsibility is to keep the intended outcome in view and make sure the evidence reaches it.
