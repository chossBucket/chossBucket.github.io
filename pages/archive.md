---
layout: page
title: Archive
---
<!-- <h1 class="page-heading">Posts</h1> -->

<ul class="post-list posts">
  {% for post in site.posts %}

  <li>
    <h2 class="post-title"><a href="{{ post.url }}">{{ post.title }}</a></h2>
    <p class="post-meta">{{ post.date | date_to_string }}</p>
  </li>

  {% endfor %}
</ul>



<p class="rss-subscribe">subscribe <a href="{{ "/feed.xml" | prepend: site.baseurl }}">via RSS</a></p>
