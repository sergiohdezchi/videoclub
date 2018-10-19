class CustomFormBuilder < ActionView::Helpers::FormBuilder
  def field_error(attribute)
    if self.object.errors[attribute].any?
      @template.content_tag :span, self.object.errors[attribute].first, class: 'badge badge-pill badge-danger'
    end
  end
end