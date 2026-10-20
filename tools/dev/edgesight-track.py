import json, sys
from ultralytics import YOLO
model = YOLO("yolov8m.pt")  # official Ultralytics weights (COCO)
names = model.names
frames = []
for i, r in enumerate(model.track(source="site.mp4", stream=True, persist=True, imgsz=1280, conf=0.35, classes=[0, 2, 7], tracker="bytetrack.yaml", verbose=False)):
    h, w = r.orig_shape
    boxes = []
    if r.boxes is not None and r.boxes.id is not None:
        for (x1, y1, x2, y2), c, cid, tid in zip(r.boxes.xyxy.tolist(), r.boxes.conf.tolist(), r.boxes.cls.tolist(), r.boxes.id.tolist()):
            boxes.append({"id": int(tid), "cls": names[int(cid)], "conf": round(c, 2), "b": [round(x1 / w, 4), round(y1 / h, 4), round(x2 / w, 4), round(y2 / h, 4)]})
    frames.append(boxes)
json.dump({"fps": 24, "w": w, "h": h, "frames": frames}, open("tracks.json", "w"))
ids = {}
for f in frames:
    for b in f: ids.setdefault((b["id"], b["cls"]), 0); ids[(b["id"], b["cls"])] += 1
print(len(frames), "frames; tracks:", sorted(((k[0], k[1], v) for k, v in ids.items()), key=lambda t: -t[2]))
