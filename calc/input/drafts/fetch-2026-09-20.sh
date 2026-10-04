#!/bin/bash
# Fetch pilot sources for week 2026-09-20. Sequential, max 2 attempts each.
set -u
cd "$(dirname "$0")"
OUT=texts-2026-09-20
mkdir -p "$OUT"
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
: > fetch-report.tsv
while IFS=$'\t' read -r id url; do
  [ -z "$id" ] && continue
  html="$OUT/$id.html"
  status=""
  for attempt in 1 2; do
    code=$(curl -sS -L --compressed --max-time 15 -o "$html" -w '%{http_code}' \
      -H "User-Agent: $UA" \
      -H "Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8" \
      -H "Accept-Language: en-US,en;q=0.9,ru;q=0.8" \
      "$url" 2>/dev/null) || code="000"
    case "$code" in
      429|406|5*|000) status="$code"; sleep 1;;
      *) status="$code"; break;;
    esac
  done
  if [ "$status" = "200" ] && [ -s "$html" ]; then
    # extract text: drop scripts/styles, tags, collapse blank lines
    sed -e 's/<script[^>]*>/\n<script>/g' "$html" \
      | awk 'BEGIN{skip=0} /<script/{skip++} /<\/script>/{if(skip>0)skip--; next} skip==0{print}' \
      | sed -e 's/<style[^>]*>/\n<style>/g' \
      | awk 'BEGIN{skip=0} /<style/{skip++} /<\/style>/{if(skip>0)skip--; next} skip==0{print}' \
      | sed -e 's/<[^>]*>/ /g' \
      | sed -e 's/&nbsp;/ /g; s/&amp;/\&/g; s/&lt;/</g; s/&gt;/>/g; s/&quot;/"/g; s/&#0*39;/'"'"'/g; s/&rsquo;/'"'"'/g; s/&ldquo;/"/g; s/&rdquo;/"/g; s/&mdash;/--/g; s/&hellip;/.../g' \
      | tr -s ' \t' ' ' \
      | awk 'NF' > "$OUT/$id.txt"
    rm -f "$html"
    if [ ! -s "$OUT/$id.txt" ]; then status="200-empty"; fi
  else
    rm -f "$html"
  fi
  echo -e "$id\t$status\t$url" >> fetch-report.tsv
  echo "$id -> $status"
done < sources-list.tsv
