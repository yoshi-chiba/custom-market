json.array! @child_categories do |child|
  json.id  child.id
  json.name  child.name
end

json.array! @grandchild_categories do |grandchild|
  json.id  grandchild.id
  json.name  grandchild.name
end