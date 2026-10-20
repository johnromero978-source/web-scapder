import json
d = json.load(open("web/edgesight-tracks.json")); fr = d["frames"]; fps = d["fps"]
events, prev_n, machine_on = [], None, False
# Debounce: a count change must hold for 12 frames (0.5 s) before it is logged.
stable_n, since = None, 0
last_m = -99
for i, row in enumerate(fr):
    n = sum(1 for r in row if r[1] == "person")
    m = any(r[1] == "machine" for r in row)
    if n == stable_n: since += 1
    else: stable_n, since = n, 1
    if since == 12 and n != prev_n:
        events.append({"t": round((i - 11) / fps, 2), "type": "people_count", "n": n}); prev_n = n
    if m: last_m = i
    if m and not machine_on: machine_on = True; events.append({"t": round(i / fps, 2), "type": "machine_in_view"})
    if machine_on and not m and i - last_m >= 12: machine_on = False; events.append({"t": round((last_m + 1) / fps, 2), "type": "machine_out_of_view"})
d["events"] = events
d["source"] = "YOLOv8m (Ultralytics, COCO) + ByteTrack on the clip; events are person-count changes (debounced 0.5 s) and machinery entering/leaving the view, derived only from these boxes"
json.dump(d, open("web/edgesight-tracks.json", "w"), separators=(",", ":"))
print(events)
